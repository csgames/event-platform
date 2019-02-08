import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "../../guards/role.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: "src/app/features/team/attendee-team-view/attendee-team-view.module#AttendeeTeamViewModule",
        // canActivate: [RoleGuard],
        // data: { roles: ["attendee", "captain"], redirect: "team/" }
    },
    {
        path: "edit",
        loadChildren: "src/app/features/team/team-edit/team-edit.module#TeamEditModule"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule {}
