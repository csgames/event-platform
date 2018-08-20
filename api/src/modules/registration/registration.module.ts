import { Module } from "@nestjs/common";
import { STSModule } from "../sts/sts.module";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";

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
