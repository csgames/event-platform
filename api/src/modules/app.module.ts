import { Module } from "@nestjs/common";
import { AttendeesModule } from "./database/attendees/attendees.module";
import { RegistrationModule } from "./registration/registration.module";
import { SchoolsModule } from "./database/schools/schools.module";

@Module({
    modules: [
        AttendeesModule,
        SchoolsModule,
        RegistrationModule
    ]
})
export class ApplicationModule { }
