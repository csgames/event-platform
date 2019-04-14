import { Injectable } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";
import { UserCache } from "./cache.model";

@Injectable()
export class CacheService {
    constructor(private readonly redisService: RedisService) {
    }

    public async setUserCache(email: string, eventId: string, cache: UserCache) {
        await this.redisService.set(`${email}:${eventId}:permissions`, JSON.stringify(cache.permissions));
        await this.redisService.set(`${email}:${eventId}:role`, cache.role);
    }

    public async getUserCache(email: string, eventId: string): Promise<UserCache> {
        const permissions = await this.redisService.get(`${email}:${eventId}:permissions`);
        const role = await this.redisService.get(`${email}:${eventId}:role`);

        if (!permissions || !role) {
            return null;
        }

        return {
            permissions: JSON.parse(permissions),
            role
        };
    }

    public async invalidateCache() {
        await this.redisService.scanDel(`*:permissions`);
        await this.redisService.scanDel(`*:role`);
    }
}
