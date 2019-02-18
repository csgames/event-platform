import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TracksComponent } from "./tracks.component";

const routes: Routes = [
    { path: "", component: TracksComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TracksRoutingModule {}
