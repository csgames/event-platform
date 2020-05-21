import { Injectable } from "@nestjs/common";
import { Auth0Config } from "./models/auth0-config";
import { GlobalConfig } from "./models/global-config";
import { MessagingConfig } from "./models/messaging-config";
import { MongoConfig } from "./models/mongo-config";
import { NexmoConfig } from "./models/nexmo-config";
import { RedisConfig } from "./models/redis-config";
import { RegistrationConfig } from "./models/registration-config";
import { ResetPasswordConfig } from "./models/reset-password-config";

@Injectable()
export class ConfigService {
    public global: GlobalConfig;
    public mongo: MongoConfig;
    public messaging: MessagingConfig;
    public nexmo: NexmoConfig;
    public registration: RegistrationConfig;
    public redisConfig: RedisConfig;
    public resetPasswordConfig: ResetPasswordConfig;
    public auth0: Auth0Config;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadGlobalConfig();
        this.loadMongoConfig();
        this.loadMessagingConfig();
        this.loadNexmo();
        this.loadRegistration();
        this.loadRedis();
        this.loadResetPassword();
        this.auth0 = new Auth0Config();
    }

    private loadGlobalConfig() {
        const packageJson = require("../../../package.json");
        this.global = {
            mode: process.env.NODE_ENV || "development",
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
        const file = process.env.MESSAGING_KEY_FILE_B64;
        if (file) {
            const data = new Buffer(file, "base64").toString();
            this.messaging = {
                projectId: process.env.MESSAGING_PROJECT_ID,
                keyFileObj: JSON.parse(data)
            };
        } else {
            this.messaging = {
                projectId: process.env.MESSAGING_PROJECT_ID,
                keyFilePath: process.env.MESSAGING_KEY_FILE_PATH
            };
        }
    }

    private loadNexmo() {
        this.nexmo = {
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET,
            debug: process.env.NEXMO_DEBUG === "true",
            phoneNumber: process.env.NEXMO_FROM_NUMBER
        };
    }

    private loadRegistration() {
        this.registration = {
            registrationUrl: process.env.ACCOUNT_CREATION_URL,
            loginUrl: process.env.LOGIN_URL
        };
    }

    private loadRedis() {
        this.redisConfig = {
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: +process.env.REDIS_PORT
        };
    }

    private loadResetPassword() {
        this.resetPasswordConfig = {
            resetPasswordUrl: process.env.RESET_PASSWORD_URL
        };
    }
}
