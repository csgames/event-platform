import { HttpException, Injectable } from "@nestjs/common";
import { STSService } from "@polyhx/nest-services";
import { Response } from "node-fetch";
import * as querystring from "querystring";

let nodeFetch = require("node-fetch");

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
export class EmailService {

    private sendEmailUrl = process.env.EMAIL_SERVICE_URL + "/email/";

    constructor(private stsService: STSService) {
    }

    public async sendEmail(email: Email) {
        if (!email) {
            throw new Error("Email is null");
        }

        if (email.variables) {
            email.variables = JSON.stringify(email.variables);
        }
        let body = querystring.stringify(email as any);

        let res: Response;
        try {
            res = await nodeFetch(this.sendEmailUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${await this.stsService.getCurrentAccessToken()}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body
            });
        } catch (e) {
            throw new Error("Failed to execute node fetch to email service.");
        }

        if (!res.ok) {
            throw new HttpException(res.statusText, res.status);
        }

        return res.json();
    }
}
