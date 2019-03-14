import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PuzzleAdminComponent } from "./puzzle-admin.component";

const routes: Routes = [
    { path: "", component: PuzzleAdminComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleAdminRoutingModule {}
