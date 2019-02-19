import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "tracks", loadChildren: "src/app/features/puzzle-hero/tracks/tracks.module#TracksModule" },
    { path: "scoreboard", loadChildren: "src/app/features/puzzle-hero/scoreboard/scoreboard.module#ScoreboardModule" },
    { path: "**", redirectTo: "tracks" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleHeroRoutingModule {}
