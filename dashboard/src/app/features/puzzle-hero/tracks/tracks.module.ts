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
import * as fromPuzzleHero from "./store/tracks.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TracksEffects } from "./store/tracks.effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { SimpleModalModule } from "ngx-simple-modal";
import { PuzzleComponentsModule } from "../components/puzzle-components.module";
import { InfoPuzzleHeroModule } from "./components/info-puzzle-hero/info-puzzle-hero.module";

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
        InfoPuzzleHeroModule,
        SimpleModalModule,

        StoreModule.forFeature("puzzleHeroTracks", fromPuzzleHero.reducer),
        EffectsModule.forFeature([TracksEffects])
    ],
    exports: [TracksComponent],
    declarations: [TracksComponent],
    providers: []
})
export class TracksModule {
}
