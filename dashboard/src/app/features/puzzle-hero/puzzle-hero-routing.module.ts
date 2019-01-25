import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PuzzleHeroComponent } from "./puzzle-hero.component";

const routes: Routes = [
    { path: "", component: PuzzleHeroComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleHeroRoutingModule {}
