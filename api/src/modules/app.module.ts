import { Module } from "@nestjs/common";
import { AttendeesModule } from "./database/attendees/attendees.module";

@Module({
    modules: [
        AttendeesModule
    ]
})
export class ApplicationModule {
}
