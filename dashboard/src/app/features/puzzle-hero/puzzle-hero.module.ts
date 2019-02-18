import { NgModule } from "@angular/core";
import { PuzzleHeroComponent } from "./puzzle-hero.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleHeroRoutingModule } from "./puzzle-hero-routing.module";
import { RouterModule } from "@angular/router";
import { TrackComponent } from "./components/track/track.component";
import { AccordionModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { TrackDirective } from "./components/track/track.directive";
import { PuzzleTileComponent } from "./components/puzzle-tile/puzzle-tile.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";

import * as fromPuzzleHero from "./store/puzzle-hero.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PuzzleHeroEffects } from "./store/puzzle-hero.effects";
import { LoadingSpinnerModule } from "../../components/loading-spinner/loading-spinner.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PuzzleHeroRoutingModule,
        NgxGraphModule,
        AccordionModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        TranslateModule,

        StoreModule.forFeature("puzzleHero", fromPuzzleHero.reducer),
        EffectsModule.forFeature([PuzzleHeroEffects])
    ],
    exports: [],
    declarations: [PuzzleHeroComponent, TrackComponent, TrackDirective, PuzzleTileComponent],
    providers: []
})
export class PuzzleHeroModule {}
