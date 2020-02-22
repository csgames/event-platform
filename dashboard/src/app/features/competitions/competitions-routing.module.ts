import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "../../guards/role.guard";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import("src/app/features/competitions/admin/competitions-admin.module").then(m => m.CompetitionsAdminModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin", "director"], redirect: "competition" }
    },
    {
        path: "edit",
        loadChildren: () => import("src/app/features/competitions/edit/competition-edit.module").then(m => m.CompetitionEditModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin", "director"], redirect: "competition" }
    },
    {
        path: "",
        loadChildren: () => import("src/app/features/competitions/list/competitions-list.module").then(m => m.CompetitionsListModule),
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain"], redirect: "competition/admin" }
    },
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsRoutingModule {}
