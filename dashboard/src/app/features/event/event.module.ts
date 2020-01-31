import { NgModule } from "@angular/core";
import { EventRoutingModule } from "./event-routing.module";
import { EventNotFoundModule } from "./not-found/event-not-found.module";
import { EventSettingsModule } from "./settings/event-settings.module";

@NgModule({
    imports: [
        EventNotFoundModule,
        EventSettingsModule,
        EventRoutingModule
    ]
})
export class EventModule {
}
