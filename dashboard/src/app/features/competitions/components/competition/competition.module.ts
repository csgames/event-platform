import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { PipeModule } from "src/app/pipe/pipe.module";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuestionCardComponent } from "./question-card/question-card.component";
import { CompetitionComponent } from "./competition.component";
import { reducer } from "./store/competition.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CompetitionEffects } from "./store/competition.effects";
import { CompetitionsService } from "src/app/providers/competitions.service";

@NgModule({
    imports: [
        CommonModule,
        LoadingSpinnerModule,
        FlexLayoutModule,
        PipeModule,
        TranslateModule,
        StoreModule.forFeature("competition", reducer),
        EffectsModule.forFeature([CompetitionEffects]),

    ],
    declarations: [QuestionCardComponent, CompetitionComponent],
    entryComponents: [CompetitionComponent],
    providers: [CompetitionsService]
})
export class CompetitionModule {}
