import { Module } from '@nestjs/common';
import { ConfigModule } from '../configs/config.module';
import { InfoController } from './info.controller';

@Module({
    imports: [ConfigModule],
    controllers: [InfoController]
})
export class InfoModule {
}
