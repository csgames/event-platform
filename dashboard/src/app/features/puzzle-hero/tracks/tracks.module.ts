import { NgModule } from "@angular/core";
import { TracksComponent } from "./tracks.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TracksRoutingModule } from "./tracks-routing.module";
import { RouterModule } from "@angular/router";
import { AccordionModule } from "ngx-bootstrap";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import * as fromInfoPuzzleHero from "./components/info-puzzle-hero/store/info-puzzle-hero.reducer";
import * as fromPuzzleHero from "./store/tracks.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TracksEffects } from "./store/tracks.effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { InfoPuzzleHeroComponent } from "./components/info-puzzle-hero/info-puzzle-hero.component";
import { SimpleModalModule } from "ngx-simple-modal";
import { InfoPuzzleHeroEffects } from "./components/info-puzzle-hero/store/info-puzzle-hero.effects";
import { PuzzleComponentsModule } from "../components/puzzle-components.module";
import { DirectivesModule } from "../../../directives/directives.module";

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
        PuzzleComponentsModule,

        StoreModule.forFeature("puzzleHeroTracks", fromPuzzleHero.reducer),
        StoreModule.forFeature("infoPuzzleHero", fromInfoPuzzleHero.reducer),
        SimpleModalModule,
        EffectsModule.forFeature([TracksEffects, InfoPuzzleHeroEffects])
    ],
    exports: [],
    entryComponents: [InfoPuzzleHeroComponent],
    declarations: [TracksComponent, InfoPuzzleHeroComponent],
    providers: []
})
export class TracksModule {}
