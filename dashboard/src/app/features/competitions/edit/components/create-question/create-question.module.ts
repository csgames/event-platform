import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { CreateQuestionComponent } from "./create-question.component";
import { QuestionFormModule } from "../../../../../components/question-form/question-form.module";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import * as fromCreateQuestion from "./store/create-question.reducer";
import { CreateCompetitionEffects } from "./store/create-question.effects";

@NgModule({
    imports: [
        QuestionFormModule,
        TranslateModule,
        FlexModule,
        LoadingSpinnerModule,
        FormsModule,

        StoreModule.forFeature("createQuestion", fromCreateQuestion.reducer),
        EffectsModule.forFeature([CreateCompetitionEffects])
    ],
    declarations: [CreateQuestionComponent],
    entryComponents: [CreateQuestionComponent]
})
export class CreateQuestionModule {
}
