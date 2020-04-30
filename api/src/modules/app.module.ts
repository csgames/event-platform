import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard, JwtModule } from "nestjs-jwt2";
import { AttendeeGuard } from "../guards/attendee.guard";
import { Auth0Module } from "./auth0/auth0.module";
import { CacheModule } from "./cache/cache.module";
import { DatabaseModule } from "./database/database.module";
import { InfoModule } from "./info/info.module";
import { RedisModule } from "./redis/redis.module";

@Module({
    imports: [
        Auth0Module,
        RedisModule,
        CacheModule,
        InfoModule,
        DatabaseModule,
        JwtModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard
        },
        {
            provide: APP_GUARD,
            useClass: AttendeeGuard
        }
    ]
})
export class ApplicationModule {
}
