import { Injectable } from '@nestjs/common';
import { GlobalConfig } from './models/global-config';
import { MongoConfig } from './models/mongo-config';
import { MessagingConfig } from './models/messaging-config';
import { NexmoConfig } from './models/nexmo-config';

@Injectable()
export class ConfigService {
    public global: GlobalConfig;
    public mongo: MongoConfig;
    public messaging: MessagingConfig;
    public nexmo: NexmoConfig;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadGlobalConfig();
        this.loadMongoConfig();
        this.loadMessagingConfig();
        this.loadNexmo();
    }

    private loadGlobalConfig() {
        const packageJson = require('../../../package.json');
        this.global = {
            mode: process.env.NODE_ENV || 'development',
            version: process.env.VERSION || packageJson.version
        };
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

    private loadNexmo() {
        this.nexmo = {
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET,
            debug: process.env.NEXMO_DEBUG === "true",
            phoneNumber: process.env.NEXMO_FROM_NUMBER
        };
    }
}
