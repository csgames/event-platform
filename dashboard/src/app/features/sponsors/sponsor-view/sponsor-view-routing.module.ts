import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SponsorViewComponent } from "./sponsor-view.component";

const routes: Routes = [
    { path: "", component: SponsorViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SponsorViewRoutingModule { }
