import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from "./config.service";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private config: ConfigService) {
    }

    public createMongooseOptions(): MongooseModuleOptions {
        const config = this.config.mongo;
        return {
            uri: `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_ADDRESS}`,
            useNewUrlParser: true
        };
    }
}
