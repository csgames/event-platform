import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ConfigModule } from "../configs/config.module";

@Module({
    imports: [ConfigModule],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule {
}
