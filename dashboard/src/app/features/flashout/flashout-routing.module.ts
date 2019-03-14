import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: "src/app/features/flashout/flashout-view/flashout-view.module#FlashoutViewModule",
        canActivate: [RoleGuard],
        data: { roles: ["attendee", "captain", "godparent"], redirect: "flash-out/edit" }
    },
    {
        path: "edit",
        loadChildren: "src/app/features/flashout/flashout-edit/flashout-edit.module#FlashoutEditModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "flash-out" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutRoutingModule { }
