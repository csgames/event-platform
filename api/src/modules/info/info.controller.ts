import { Controller, Delete, Get } from "@nestjs/common";
import { PublicRoute } from "nestjs-jwt2";
import { Permissions } from "../../decorators/permission.decorator";
import { CacheService } from "../cache/cache.service";
import { ConfigService } from "../configs/config.service";

@Controller()
export class InfoController {
    constructor(private configService: ConfigService, private cacheService: CacheService) {
    }

    @Get()
    @PublicRoute()
    public info() {
        return {
            name: "CS Games Api",
            version: this.configService.global.version,
            mode: this.configService.global.mode
        };
    }

    @Delete()
    @Permissions("csgames-api:invalidate-cache:root")
    public async invalidateCache() {
        await this.cacheService.invalidateCache();
    }
}
