import { NgModule } from "@angular/core";
import { CompetitionEditComponent } from "./competition-edit.component";
import { CommonModule } from "@angular/common";
import { CompetitionEditRoutingModule } from "./competition-edit-routing.module";
import { StoreModule } from "@ngrx/store";
import * as fromCompetitionEdit from "./store/competition-edit.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CompetitionEditEffects } from "./store/competition-edit.effects";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipeModule } from "../../../pipe/pipe.module";
import { CustomTextBoxModule } from "../../../components/custom-text-box/custom-text-box.module";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuestionEditCardComponent } from "./components/question-edit-card/question-edit-card.component";
import { AccordionModule, SortableModule, TabsModule } from "ngx-bootstrap";
import { QuestionFormModule } from "../../../components/question-form/question-form.module";
import { UpdateQuestionComponent } from "./components/update-question/update-question.component";
import { CreateQuestionComponent } from "./components/create-question/create-question.component";
import { MarkdownModule } from "ngx-markdown";
import { EditCompetitionModule } from "../admin/components/edit-competition/edit-competition.module";
import { QuestionResultsCardComponent } from "./components/question-results-card/question-results-card.component";
import { CompetitionResultsComponent } from "./components/competition-results/competition-results.component";

@NgModule({
    imports: [
        CommonModule,
        CompetitionEditRoutingModule,
        LoadingSpinnerModule,
        TranslateModule,
        PipeModule,
        CustomTextBoxModule,
        FormsModule,
        FlexLayoutModule,
        AccordionModule,
        SortableModule,
        QuestionFormModule,
        MarkdownModule,
        EditCompetitionModule,
        TabsModule,

        StoreModule.forFeature("competitionEdit", fromCompetitionEdit.reducer),
        EffectsModule.forFeature([CompetitionEditEffects])
    ],
    exports: [],
    entryComponents: [UpdateQuestionComponent, CreateQuestionComponent],
    declarations: [
        CompetitionEditComponent,
        QuestionEditCardComponent,
        UpdateQuestionComponent,
        CreateQuestionComponent,
        CompetitionResultsComponent,
        QuestionResultsCardComponent
    ],
    providers: []
})
export class CompetitionEditModule {}
