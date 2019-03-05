import { Routes, RouterModule } from "@angular/router";
import { FlashoutComponent } from "./flashout.component";
import { NgModule } from "@angular/core";
import { FlashoutGuard } from "./guards/flashout.guard";

const routes: Routes = [
    { path: "", component: FlashoutComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlashoutRoutingModule { }
