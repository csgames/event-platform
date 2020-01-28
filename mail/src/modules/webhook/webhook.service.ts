import { Injectable } from "@nestjs/common";
import { EmailService } from "../database/email/email.service";
import { DeliveredWebHook, DroppedWebHook } from "./webhook.interface";

@Injectable()
export class WebHookService {
    constructor(private readonly emailService: EmailService) {}

    public async updateStatus(webHook: DeliveredWebHook | DroppedWebHook) {
        return await this.emailService.updateStatus(webHook);
    }
}
