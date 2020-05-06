import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtGuard, JwtModule } from "nestjs-jwt2";
import { Auth0Module } from "./auth0/auth0.module";
import { DatabaseModule } from "./database/database.module";
import { WebHookModule } from "./webhook/webhook.module";
import { InfoModule } from "./info/info.module";
import { ConfigModule } from "./configs/config.module";

const mongoUri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}`;

@Module({
    imports: [
        ConfigModule,
        Auth0Module,
        InfoModule,
        MongooseModule.forRoot(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
        DatabaseModule,
        WebHookModule,
        JwtModule
    ],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtGuard
    }]
})
export class ApplicationModule {
}
