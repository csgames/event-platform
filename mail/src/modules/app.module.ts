import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "./database/database.module";
import { WebHookModule } from "./webhook/webhook.module";

const mongoUri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}`;

@Module({
    imports: [
        MongooseModule.forRoot(mongoUri, { useMongoClient: true }),
        DatabaseModule,
        WebHookModule
    ]
})
export class ApplicationModule {
}
