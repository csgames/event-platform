import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { STSModule } from '@polyhx/nest-services';
import { AttendeesModule } from '../database/attendees/attendees.module';
import { EventsModule } from '../database/events/events.module';

@Module({
    imports: [
        STSModule,
        AttendeesModule,
        EventsModule
    ],
    controllers: [
        RegistrationController
    ],
    providers: [
        RegistrationService
    ]
})
export class RegistrationModule {
}
