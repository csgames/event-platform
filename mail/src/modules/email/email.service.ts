import { Component } from "@nestjs/common";
import * as _mailgun from "mailgun-js";
import { EmailMessage } from "./email.interface";

@Component()
export class EmailService {

    private readonly mailgun;

    constructor() {
        this.mailgun = new _mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    }

    async send(emailMessage: EmailMessage) {
        return await this.mailgun.messages().send(emailMessage);
    }
}
