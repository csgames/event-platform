import { Routes, RouterModule } from "@angular/router";
import { CompetitionsListComponent } from "./competitions-list.component";
import { NgModule } from "@angular/core";
import { CompetitionComponent } from "./components/competition/competition.component";

const routes: Routes = [
    { path: "", component: CompetitionsListComponent},
    { path: ":id", component: CompetitionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsListRoutingModule { }
