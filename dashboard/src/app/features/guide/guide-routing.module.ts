import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("src/app/features/guide/guide-view/guide-view.module").then(m => m.GuideViewModule),
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent", "director", "volunteer"], redirect: "guide/edit" }
    },
    {
        path: "edit",
        loadChildren: () => import("src/app/features/guide/guide-edit/guide-edit.module").then(m => m.GuideEditModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "guide" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuideRoutingModule { }
