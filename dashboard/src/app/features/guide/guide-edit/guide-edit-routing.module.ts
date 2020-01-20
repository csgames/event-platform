import { Routes, RouterModule } from "@angular/router";
import { GuideEditComponent } from "./guide-edit.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: GuideEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuideEditRoutingModule {}
