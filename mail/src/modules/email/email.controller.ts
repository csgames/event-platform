import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { dtoToMailgunReadable, EmailSendDto } from "./email.dto";
import { EmailService } from "./email.service";
import { Template } from "../database/templates/templates.model";
import { TemplatesService } from "../database/templates/templates.service";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { PermissionsGuard } from "../../guards/permission.guard";
import { Permissions } from "../../decorators/permission.decorator";

@Controller("email")
@UseGuards(PermissionsGuard)
export class EmailController {
    constructor(private readonly emailService: EmailService,
                private readonly templatesService: TemplatesService) {
    }

    @Post()
    @Permissions("mail_service:send:email")
    async send(@Body(new ValidationPipe()) emailSendDto: EmailSendDto) {
        if (emailSendDto.template) {
            let template: Template = await this.templatesService.findOne(emailSendDto.template);
            if (!template) {
                throw new HttpException("Template " + emailSendDto.template + " not found.", HttpStatus.NOT_FOUND);
            }
            emailSendDto.html = template.html;
        }
        // Merge variables.
        if (emailSendDto.variables) {
            if (typeof emailSendDto.variables === "string") {
                emailSendDto.variables = JSON.parse(emailSendDto.variables);
            }
            for (let variable in emailSendDto.variables) {
                if (emailSendDto.variables.hasOwnProperty(variable)) {
                    let re: RegExp = new RegExp("{{" + variable + "}}", "g");
                    emailSendDto.html = emailSendDto.html.replace(re, emailSendDto.variables[ variable ]);
                }
            }
        }
        return this.emailService.send(dtoToMailgunReadable(emailSendDto));
    }
}
