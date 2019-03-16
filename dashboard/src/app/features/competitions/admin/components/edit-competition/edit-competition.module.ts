import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import { CompetitionFormModule } from "../competition-form/competition-form.module";
import { EditCompetitionEffects } from "./store/edit-competition.effects";
import * as fromEditCompetition from "./store/edit-competition.reducer";
import { EditCompetitionComponent } from "./edit-competition.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        CompetitionFormModule,
        LoadingSpinnerModule,
        FlexLayoutModule,
        StoreModule.forFeature("editCompetition", fromEditCompetition.reducer),
        EffectsModule.forFeature([EditCompetitionEffects])
    ],
    declarations: [EditCompetitionComponent],
    entryComponents: [EditCompetitionComponent]
})
export class EditCompetitionModule {}
