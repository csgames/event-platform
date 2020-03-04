import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/guards/role.guard";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("src/app/features/sponsors/sponsor-view/sponsor-view.module").then(m => m.SponsorViewModule),
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent", "director", "volunteer", "sponsor"], redirect: "sponsor/edit" }
    },
    {
        path: "edit",
        loadChildren: () => import("src/app/features/sponsors/sponsor-edit/sponsor-edit.module").then(m => m.SponsorEditModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "sponsor"}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SponsorRoutingModule { }
