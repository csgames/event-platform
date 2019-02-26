import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PuzzleHeroGuard } from "./guards/puzzle-hero.guard";
import { ScoreboardGuard } from "./guards/scoreboard.guard";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: "src/app/features/puzzle-hero/admin/puzzle-admin.module#PuzzleAdminModule"
    },
    { path: "tracks", loadChildren: "src/app/features/puzzle-hero/tracks/tracks.module#TracksModule", canActivate: [PuzzleHeroGuard] },
    {
        path: "scoreboard",
        loadChildren: "src/app/features/puzzle-hero/scoreboard/scoreboard.module#ScoreboardModule",
        canActivate: [ScoreboardGuard]
    },
    { path: "**", redirectTo: "tracks" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleHeroRoutingModule {}
