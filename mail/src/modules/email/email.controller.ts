import { Body, Controller, Post } from "@nestjs/common";
import { dtoToMailgunReadable, EmailSendDto } from "./email.dto";
import { EmailService } from "./email.service";
import { Template } from "../database/templates/templates.model";
import { TemplatesService } from "../database/templates/templates.service";
import { ValidationPipe } from "../../pipes/validation.pipe";

@Controller("email")
export class EmailController {
    constructor(private readonly emailService: EmailService,
                private readonly templatesService: TemplatesService) {
    }

    @Post()
    async send(@Body(new ValidationPipe()) emailSendDto: EmailSendDto) {
        if (emailSendDto.template) {
            let template: Template = await this.templatesService.findOne(emailSendDto.template);
            emailSendDto.html = template.html;
        }
        // Merge variables.
        for (let variable in emailSendDto.variables) {
            if (emailSendDto.variables.hasOwnProperty(variable)) {
                let re: RegExp = new RegExp("{{" + variable + "}}", "g");
                emailSendDto.html = emailSendDto.html.replace(re, emailSendDto.variables[ variable ]);
            }
        }
        return this.emailService.send(dtoToMailgunReadable(emailSendDto));
    }
}
