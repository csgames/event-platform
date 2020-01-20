import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: "src/app/features/guide/guide-view/guide-view.module#GuideViewModule",
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent"], redirect: "guide/edit" }
    },
    {
        path: "edit",
        loadChildren: "src/app/features/guide/guide-edit/guide-edit.module#GuideEditModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "guide" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuideRoutingModule { }
