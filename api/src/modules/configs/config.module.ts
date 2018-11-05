import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { MongooseConfigService } from './mongo-config.service';

@Module({
    providers: [
        ConfigService,
        MongooseConfigService
    ],
    exports: [
        ConfigService,
        MongooseConfigService
    ]
})
export class ConfigModule {
}
