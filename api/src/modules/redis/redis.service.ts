import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ConfigService } from '../configs/config.service';

@Injectable()
export class RedisService {
    private readonly client: Redis.Redis;

    constructor(private readonly configService: ConfigService) {
        this.client = new Redis({
            host: this.configService.redisConfig.host,
            port: this.configService.redisConfig.port,
            password: this.configService.redisConfig.password
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

    public zadd(key: string, value: string, score: number): Promise<string | number> {
        return this.client.zadd(key, score.toString(), value);
    }

    public async zrange(key: string, start: number, end: number): Promise<{ value: string, score: number }[]> {
        const res = await this.client.zrange(key, start, end, 'WITHSCORES');
        const scores = [];
        for (let i = 0; i < res.length / 2; ++i) {
            scores.push({
                value: res[i * 2],
                score: res[i * 2 + 1]
            });
        }
        return scores.reverse();
    }
}
