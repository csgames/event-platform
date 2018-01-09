import { Component } from "@nestjs/common";
import * as io from "socket.io-client";
import { STSService } from "@polyhx/nest-services";
import { EmailService } from "../database/email/email.service";
import { DeliveredWebHook, DroppedWebHook } from "./webhook.interface";

@Component()
export class WebHookService {
    private socket: SocketIOClient.Socket;

    constructor(private readonly emailService: EmailService, private readonly stsService: STSService) {}

    async init() {
        this.socket = io('ws://localhost/mail', {
            query: { token: await this.stsService.getCurrentAccessToken()}
        });

        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => {
                resolve();
            });
            this.socket.on('error', () => {
                reject();
            });
            this.socket.on('connect_error', () => {
                reject();
            });
            this.socket.on('connect_timeout', () => {
                reject();
            });
        });
    }

    async updateStatus(webHook: DeliveredWebHook | DroppedWebHook) {
        let success = await this.emailService.updateStatus(webHook);

        await this.emitMessage({
            mailgunId: webHook.messageHeaders.messageId,
            recipient: webHook.recipient,
            status: webHook.event
        });

        return success;
    }

    private async emitMessage(data: any) {
        if (!this.socket) {
            await this.init();
        }
        (<any>this.socket).query = { token: this.stsService.getCurrentAccessToken() };

        this.socket.emit('mail-status-changed', data);
    }
}
