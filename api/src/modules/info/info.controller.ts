import { Controller, Get } from '@nestjs/common';
import { PublicRoute } from 'nestjs-jwt2';
import { ConfigService } from '../configs/config.service';

@Controller()
export class InfoController {
    constructor(private configService: ConfigService) {
    }

    @Get()
    @PublicRoute()
    public info() {
        return {
            name: 'CS Games Api',
            version: this.configService.global.version,
            mode: this.configService.global.mode
        };
    }
}
