import { Module } from "@nestjs/common";
import { STSModule } from "../sts/sts.module";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";

@Module({
    modules: [ STSModule ],
    controllers: [ RegistrationController ],
    components: [ RegistrationService ]
})
export class RegistrationModule {
}
