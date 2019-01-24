import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { JwtGuard, JwtModule } from 'nestjs-jwt2';
import { DatabaseModule } from "./database/database.module";
import { InfoModule } from './info/info.module';
import { RegistrationModule } from "./registration/registration.module";

@Module({
    imports: [
        InfoModule,
        DatabaseModule,
        RegistrationModule,
        JwtModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ]
})
export class ApplicationModule { }
