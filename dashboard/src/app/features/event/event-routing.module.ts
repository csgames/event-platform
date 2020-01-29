import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventNotFoundComponent } from "./not-found/event-not-found.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "404",
        pathMatch: "full"
    },
    {
        path: "404",
        component: EventNotFoundComponent
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
