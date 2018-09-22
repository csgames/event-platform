import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { STSModule } from '@polyhx/nest-services';

@Module({
    imports: [
        STSModule
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
