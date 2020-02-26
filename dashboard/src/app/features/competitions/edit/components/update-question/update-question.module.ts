import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";


import { UpdateQuestionComponent } from "./update-question.component";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import { QuestionFormModule } from "../../../../../components/question-form/question-form.module";
import { StoreModule } from "@ngrx/store";
import * as fromUpdateQuestion from "./store/update-question.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UpdateCompetitionEffects } from "./store/update-question.effects";

@NgModule({
    imports: [
        LoadingSpinnerModule,
        QuestionFormModule,
        TranslateModule,
        FormsModule,
        FlexModule,

        StoreModule.forFeature("updateQuestion", fromUpdateQuestion.reducer),
        EffectsModule.forFeature([UpdateCompetitionEffects])
    ],
    declarations: [UpdateQuestionComponent],
    entryComponents: [UpdateQuestionComponent]
})
export class UpdateQuestionModule {
}
