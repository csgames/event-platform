import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PuzzleHeroGuard } from "./guards/puzzle-hero.guard";
import { ScoreboardGuard } from "./guards/scoreboard.guard";
import { PuzzleHeroRoutingModule } from "./puzzle-hero-routing.module";

@NgModule({
    imports: [
        CommonModule,
        PuzzleHeroRoutingModule
        
    ],
    exports: [],
    providers: [
        PuzzleHeroGuard,
        ScoreboardGuard
    ]
})
export class PuzzleHeroModule {}
