import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '../configs/config.service';

@Injectable()
export class MessagingService {
    private app: admin.app.App;
    private messaging: admin.messaging.Messaging;

    constructor(private config: ConfigService) {
        this.init();
    }

    public async send(message: admin.messaging.MessagingPayload, tokens: string[]) {
        return this.messaging.sendToDevice(tokens, message);
    }

    private init() {
        this.app = admin.initializeApp({
            projectId: this.config.messaging.projectId,
            credential: admin.credential.cert(this.config.messaging.keyFilePath)
        });

        this.messaging = this.app.messaging();
    }
}
