import { Injectable } from "@nestjs/common";
import * as Redis from "ioredis";
import { ConfigService } from '../configs/config.service';

@Injectable()
export class RedisService {
    private readonly client: Redis.Redis;

    constructor(private readonly configService: ConfigService) {
        this.client = new Redis({
            host: "localhost",
            port: 6379
        });
    }

    public set(key: string, value: string): Promise<any> {
        return this.client.set(key, value);
    }

    public get(key: string): Promise<string> {
       return this.client.get(key);
    }

    public lpush(key: string, value: string): Promise<number> {
        return this.client.lpush(key, value);
    }

    public lrem(key: string, value: string, count: number = 0): Promise<number> {
        return this.client.lrem(key, count, value);
    }

    public lrange(key: string, start: number, end: number): Promise<string[]> {
        return this.client.lrange(key, start, end);
    }

    public scanDel(pattern: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const stream = this.client.scanStream({
                match: pattern
            });

            const keys = [];
            stream.on('data', (resultKeys) => {
                for (const key of resultKeys) {
                    keys.push(key);
                }
            });
            stream.on('end', async () => {
                await this.client.del(...keys);
                resolve();
            });
        });
    }
}
