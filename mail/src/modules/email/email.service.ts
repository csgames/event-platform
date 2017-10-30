import { Component } from "@nestjs/common";
import * as _mailgun from "mailgun-js";
import { EmailSendDto } from "./email.dto";

@Component()
export class EmailService {

    private readonly mailgun;

    constructor() {
        this.mailgun = new _mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    }

    async send(emailSendDto: EmailSendDto) {
        return await this.mailgun.messages().send(emailSendDto);
    }
}
