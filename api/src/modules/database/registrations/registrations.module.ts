import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { STSModule } from '@polyhx/nest-services';
import { AttendeesModule } from '../attendees/attendees.module';
import { EventsModule } from '../events/events.module';
import { RegistrationsSchema } from './registrations.model';
import { EmailModule } from '../../email/email.module';
import { ConfigModule } from '../../configs/config.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "registrations",
            schema: RegistrationsSchema
        }]),
        STSModule,
        AttendeesModule,
        EventsModule,
        EmailModule,
        ConfigModule
    ],
    controllers: [
        RegistrationsController
    ],
    providers: [
        RegistrationsService
    ],
    exports: [
        RegistrationsService
    ]
})
export class RegistrationsModule {
}
