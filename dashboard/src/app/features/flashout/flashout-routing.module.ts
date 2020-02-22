import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoleGuard } from "src/app/guards/role.guard";
import { FlashoutGuard } from "./guards/flashout.guard";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("src/app/features/flashout/flashout-view/flashout-view.module").then(m => m.FlashoutViewModule),
        canActivate: [RoleGuard, FlashoutGuard],
        data: { roles: ["attendee", "captain", "godparent"], redirect: "flash-out/edit" }
    },
    {
        path: "edit",
        loadChildren: () => import("src/app/features/flashout/flashout-edit/flashout-edit.module").then(m => m.FlashoutEditModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "flash-out" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutRoutingModule { }
