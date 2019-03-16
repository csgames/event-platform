import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import { CompetitionFormModule } from "../competition-form/competition-form.module";
import { CompetitionEditEffects } from "./store/competition-edit.effects";
import * as fromCompetitionEdit from "./store/competition-edit.reducer";
import { CompetitionEditComponent } from "./competition-edit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        CompetitionFormModule,
        LoadingSpinnerModule,
        FlexLayoutModule,
        StoreModule.forFeature("competitionEdit", fromCompetitionEdit.reducer),
        EffectsModule.forFeature([CompetitionEditEffects])
    ],
    declarations: [CompetitionEditComponent],
    entryComponents: [CompetitionEditComponent]
})
export class CompetitionEditModule {
}
