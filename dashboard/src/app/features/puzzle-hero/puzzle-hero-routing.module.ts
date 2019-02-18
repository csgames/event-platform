import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "**", redirectTo: "tracks" },
    { path: "tracks", loadChildren: "src/app/features/puzzle-hero/tracks/tracks.module#TracksModule" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleHeroRoutingModule {}

