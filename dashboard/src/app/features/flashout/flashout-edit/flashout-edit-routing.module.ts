import { Routes, RouterModule } from "@angular/router";
import { FlashoutEditComponent } from "./flashout-edit.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: FlashoutEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutEditRoutingModule {}
