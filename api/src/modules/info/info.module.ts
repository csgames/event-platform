import { Module } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { ConfigModule } from "../configs/config.module";
import { InfoController } from "./info.controller";

@Module({
    imports: [ConfigModule, CacheModule],
    controllers: [InfoController]
})
export class InfoModule {
}
