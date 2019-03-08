import { Routes, RouterModule } from "@angular/router";
import { CompetitionsComponent } from "./competitions.component";
import { NgModule } from "@angular/core";
import { CompetitionComponent } from "./components/competition/competition.component";

const routes: Routes = [
    { path: "", component: CompetitionsComponent},
    { path: ":id", component: CompetitionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsRoutingModule { }
