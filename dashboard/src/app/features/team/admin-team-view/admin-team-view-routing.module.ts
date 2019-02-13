import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminTeamViewComponent } from "./admin-team-view.component";

const routes: Routes = [
    { path: "", component: AdminTeamViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminTeamViewRoutingModule {}

