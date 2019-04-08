import { Routes, RouterModule } from "@angular/router";
import { SponsorEditComponent } from "./sponsor-edit.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: SponsorEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SponsorEditRoutingModule {}
