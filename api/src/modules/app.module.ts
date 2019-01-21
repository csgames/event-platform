import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtGuard, JwtModule } from 'nestjs-jwt2';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        DatabaseModule,
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
