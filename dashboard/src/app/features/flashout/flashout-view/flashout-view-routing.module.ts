import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlashoutViewComponent } from "./flashout-view.component";

const routes: Routes = [
    { path: "", component: FlashoutViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutViewRoutingModule {
}
