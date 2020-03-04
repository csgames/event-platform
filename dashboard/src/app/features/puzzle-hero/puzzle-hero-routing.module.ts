import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PuzzleHeroGuard } from "./guards/puzzle-hero.guard";
import { ScoreboardGuard } from "./guards/scoreboard.guard";
import { RoleGuard } from "../../guards/role.guard";

const routes: Routes = [
    {
        path: "edit",
        loadChildren: () => import("src/app/features/puzzle-hero/admin/puzzle-admin.module").then(m => m.PuzzleAdminModule),
        canActivate: [RoleGuard],
        data: { roles: ["admin", "super-admin"], redirect: "puzzle-hero/tracks" }
    },
    {
        path: "tracks",
        loadChildren: () => import("src/app/features/puzzle-hero/tracks/tracks.module").then(m => m.TracksModule),
        canActivate: [PuzzleHeroGuard, RoleGuard],
        data: { roles: ["attendee", "captain", "godparent", "sponsor"], redirect: "puzzle-hero/edit" }
    },
    {
        path: "scoreboard",
        loadChildren: () => import("src/app/features/puzzle-hero/scoreboard/scoreboard.module").then(m => m.ScoreboardModule),
        canActivate: [ScoreboardGuard]
    },
    { path: "**", redirectTo: "tracks" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleHeroRoutingModule {}
