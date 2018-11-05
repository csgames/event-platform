import { Injectable } from '@nestjs/common';
import { MongoConfig } from './models/mongo-config';

@Injectable()
export class ConfigService {
    public mongo: MongoConfig;

    constructor() {
        this.loadConfigs();
    }

    private loadConfigs() {
        this.loadMongoConfig();
    }

    private loadMongoConfig() {
        this.mongo = {
            DB_ADDRESS: process.env.DB_ADDRESS,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_USERNAME: process.env.DB_USERNAME
        };
    }
}
