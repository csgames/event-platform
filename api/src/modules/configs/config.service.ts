import { Injectable } from '@nestjs/common';
import { MongoConfig } from './models/mongo-config';
import { MessagingConfig } from './models/messaging-config';

@Injectable()
export class ConfigService {
    public mongo: MongoConfig;
    public messaging: MessagingConfig;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadMongoConfig();
        this.loadMessagingConfig();
    }

    private loadMongoConfig() {
        this.mongo = {
            DB_ADDRESS: process.env.DB_ADDRESS,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_USERNAME: process.env.DB_USERNAME
        };
    }

    private loadMessagingConfig() {
        this.messaging = {
            projectId: process.env.MESSAGING_PROJECT_ID,
            keyFilePath: process.env.MESSAGING_KEY_FILE_PATH
        };
    }
}
