import { Routes, RouterModule } from "@angular/router";
import { CompetitionsComponent } from "./competitions.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: CompetitionsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsRoutingModule { }
