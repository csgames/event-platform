import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as _mailgun from "mailgun-js";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Email } from "./email.model";
import { dtoToMailgunReadable, EmailSendDto } from "./email.dto";
import { Template } from "../templates/templates.model";
import { TemplatesService } from "../templates/templates.service";
import { DeliveredWebHook, DroppedWebHook } from "../../webhook/webhook.interface";

@Injectable()
export class EmailService {
    private readonly mailgun;

    constructor(@InjectModel("Mail") private readonly emailModel: Model<Email>,
                private readonly templatesService: TemplatesService) {
        this.mailgun = new _mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    }

    public async send(emailMessage: EmailSendDto) {
        if (emailMessage.template) {
            emailMessage.html = await this.loadTemplate(emailMessage.template, emailMessage.variables);
        }

        emailMessage.to = typeof emailMessage.to === "string" ? [emailMessage.to] : emailMessage.to;

        const res = await this.mailgun.messages().send(dtoToMailgunReadable(emailMessage));

        const recipients = emailMessage.to.reduce((map, recipient) => {
            map[this.replaceDots(recipient)] = "queued";
            return map;
        }, {});

        const email = new this.emailModel({
            mailgunId: res.id,
            timestamp: new Date(),
            from: emailMessage.from,
            to: recipients,
            subject: emailMessage.subject,
            text: emailMessage.text,
            html: emailMessage.html,
            template: emailMessage.template,
            variables: emailMessage.variables,
        });
        await email.save();

        return res;
    }

    public async updateStatus(webHook: DeliveredWebHook | DroppedWebHook) {
        const email = await this.emailModel.findOne({
            mailgunId: webHook.messageHeaders.messageId
        }).exec();

        if (!email) {
            return false;
        }

        email.to[this.replaceDots(webHook.recipient)] = webHook.event;

        // await email.save() doesn't work...
        await this.emailModel.update({
            mailgunId: webHook.messageHeaders.messageId
        }, email).exec();

        return true;
    }

    private async loadTemplate(templateId: string, variables?: Object | string): Promise<string> {
        const template: Template = await this.templatesService.findOne(templateId);
        if (!template) {
            throw new HttpException(`Template ${template} not found.`, HttpStatus.NOT_FOUND);
        }
        let html = template.html;

        // Merge variables.
        if (variables) {
            if (typeof variables === "string") {
                variables = JSON.parse(variables);
            }
            for (let variable in <Object>variables) {
                if (variables.hasOwnProperty(variable)) {
                    let re: RegExp = new RegExp(`{{${variable}}}`, "g");
                    html = html.replace(re, variables[variable]);
                }
            }
        }

        return html;
    }

    // Cannot have dots in keys.
    // "|" is not a valid email character meaning this replacement does not create email collisions.
    private replaceDots(value: string): string {
        return value.replace(/\./g, "|");
    }
}
