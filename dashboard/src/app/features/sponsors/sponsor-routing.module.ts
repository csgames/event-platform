import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/guards/role.guard";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        loadChildren: "src/app/features/sponsors/sponsor-view/sponsor-view.module#SponsorViewModule",
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent", "director"], redirect: "sponsor/edit" }
    },
    {
        path: "edit",
        loadChildren: "src/app/features/sponsors/sponsor-edit/sponsor-edit.module#SponsorEditModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "sponsor"}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SponsorRoutingModule { }
