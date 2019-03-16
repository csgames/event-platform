import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CompetitionsAdminComponent } from "./competitions-admin.component";

const routes: Routes = [
    { path: "", component: CompetitionsAdminComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsAdminRoutingModule {}
