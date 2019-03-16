import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CompetitionEditComponent } from "./competition-edit.component";

const routes: Routes = [
    { path: ":id", component: CompetitionEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionEditRoutingModule {}
