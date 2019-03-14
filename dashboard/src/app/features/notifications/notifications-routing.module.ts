import { Routes, RouterModule } from "@angular/router";
import { NotificationsComponent } from "./notifications.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: NotificationsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationsRoutingModule { }
