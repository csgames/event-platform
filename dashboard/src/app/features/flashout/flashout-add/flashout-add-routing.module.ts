import { Routes, RouterModule } from "@angular/router";
import { FlashoutAddComponent } from "./flashout-add.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: "", component: FlashoutAddComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutAddRoutingModule {}
