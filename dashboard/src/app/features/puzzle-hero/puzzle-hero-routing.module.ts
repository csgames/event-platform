import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PuzzleHeroGuard } from "./guards/puzzle-hero.guard";
import { ScoreboardGuard } from "./guards/scoreboard.guard";
import { RoleGuard } from "../../guards/role.guard";

const routes: Routes = [
    {
        path: "edit",
        loadChildren: "src/app/features/puzzle-hero/admin/puzzle-admin.module#PuzzleAdminModule",
        canActivate: [RoleGuard],
        data: { roles: ["admin"], redirect: "puzzle-hero/tracks" }
    },
    {
        path: "tracks",
        loadChildren: "src/app/features/puzzle-hero/tracks/tracks.module#TracksModule",
        canActivate: [PuzzleHeroGuard, RoleGuard],
        data: { roles: ["attendee", "captain", "godparent"], redirect: "puzzle-hero/edit" }
    },
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
