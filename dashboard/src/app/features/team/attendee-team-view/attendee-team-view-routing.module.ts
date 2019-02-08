import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AttendeeTeamViewComponent } from "./attendee-team-view.component";

const routes: Routes = [
    { path: "", component: AttendeeTeamViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttendeeTeamViewRoutingModule {}
