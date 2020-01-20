import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "../../guards/role.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: "src/app/features/team/attendee-team-view/attendee-team-view.module#AttendeeTeamViewModule",
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent", "sponsor"], redirect: "team/edit" }
    },
    {
        path: "edit",
        loadChildren: "src/app/features/team/team-edit/team-edit.module#TeamEditModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "guide" }
    },
    {
        path: ":id",
        loadChildren: "src/app/features/team/admin-team-view/admin-team-view.module#AdminTeamViewModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "team" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule {}
