import { Module } from '@nestjs/common';
import { LHGamesService } from './lhgames.service';
import { STSModule } from '@polyhx/nest-services';

@Module({
    imports: [
        STSModule
    ],
    providers: [
        LHGamesService
    ],
    exports: [
        LHGamesService
    ]
})
export class LHGamesModule {
}
