import { Injectable } from "@nestjs/common";
import { EmailBaseService } from "./email-base.service";

export interface Email {
    from: string;
    to: string[];
    subject: string;
    text: string;
    html?: string;
    template?: string;
    variables?: { [key: string]: string } | string;
}

@Injectable()
export class EmailService extends EmailBaseService {
    constructor() {
        super("email");
    }

    public async sendEmail(email: Email) {
        return this.post("", email);
    }
}
