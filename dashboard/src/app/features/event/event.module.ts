import { NgModule } from "@angular/core";
import { EventRoutingModule } from "./event-routing.module";
import { EventNotFoundModule } from "./not-found/event-not-found.module";

@NgModule({
    imports: [
        EventNotFoundModule,
        EventRoutingModule
    ]
})
export class EventModule {
}
