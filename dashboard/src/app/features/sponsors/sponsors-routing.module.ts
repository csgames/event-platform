import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SponsorsComponent } from "./sponsors.component";

const routes: Routes = [
    { path: "", component: SponsorsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SponsorsRoutingModule { }