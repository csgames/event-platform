import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventNotFoundComponent } from "./not-found/event-not-found.component";
import { EventSettingsComponent } from "./settings/event-settings.component";
import { EventNotFoundGuard } from "../../guards/event-not-found.guard";
import { RegisteredGuard } from "../dashboard/utils/registered.guard";
import { EventFoundGuard } from "../../guards/event-found.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "404",
        pathMatch: "full"
    },
    {
        path: "404",
        component: EventNotFoundComponent,
        canActivate: [EventNotFoundGuard]
    },
    {
        path: "setting",
        component: EventSettingsComponent,
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "setting/:type",
        component: EventSettingsComponent,
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "**",
        redirectTo: "404",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule {
}
