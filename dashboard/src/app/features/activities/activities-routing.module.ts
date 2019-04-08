import { Routes, RouterModule } from "@angular/router";
import { ActivitiesComponent } from "./activities.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: ActivitiesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
