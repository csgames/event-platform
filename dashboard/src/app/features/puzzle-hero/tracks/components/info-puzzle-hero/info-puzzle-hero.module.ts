import { NgModule } from "@angular/core";

import { InfoPuzzleHeroComponent } from "./info-puzzle-hero.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import * as fromInfoPuzzleHero from "./store/info-puzzle-hero.reducer";
import { EffectsModule } from "@ngrx/effects";
import { InfoPuzzleHeroEffects } from "./store/info-puzzle-hero.effects";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { PipeModule } from "../../../../../pipe/pipe.module";
import { MonacoEditorModule } from "ngx-monaco-editor";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LoadingSpinnerModule,
        MarkdownModule,
        PipeModule,
        MonacoEditorModule,

        StoreModule.forFeature("infoPuzzleHero", fromInfoPuzzleHero.reducer),
        EffectsModule.forFeature([InfoPuzzleHeroEffects])
    ],
    exports: [],
    entryComponents: [InfoPuzzleHeroComponent],
    declarations: [InfoPuzzleHeroComponent],
    providers: []
})
export class InfoPuzzleHeroModule {
}
