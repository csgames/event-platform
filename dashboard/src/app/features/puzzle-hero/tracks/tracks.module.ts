import { NgModule } from "@angular/core";
import { TracksComponent } from "./tracks.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TracksRoutingModule } from "./tracks-routing.module";
import { RouterModule } from "@angular/router";
import { TrackComponent } from "./components/track/track.component";
import { AccordionModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { TrackDirective } from "./components/track/track.directive";
import { PuzzleTileComponent } from "./components/puzzle-tile/puzzle-tile.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import * as fromPuzzleHero from "./store/tracks.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TracksEffects } from "./store/tracks.effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { InfoPuzzleHeroComponent } from "./components/info-puzzle-hero/info-puzzle-hero.component";
import { SimpleModalModule } from "ngx-simple-modal";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TracksRoutingModule,
        NgxGraphModule,
        AccordionModule,
        FlexLayoutModule,
        LoadingSpinnerModule,
        TranslateModule,

        StoreModule.forFeature("puzzleHeroTracks", fromPuzzleHero.reducer),
        SimpleModalModule,
        EffectsModule.forFeature([TracksEffects])
    ],
    exports: [],
    entryComponents: [InfoPuzzleHeroComponent],
    declarations: [TracksComponent, TrackComponent, TrackDirective, PuzzleTileComponent, InfoPuzzleHeroComponent],
    providers: []
})
export class TracksModule {}
