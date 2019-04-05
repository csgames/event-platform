import { NgModule } from "@angular/core";

import { EditTeamInfoComponent } from "./edit-team-info.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import * as editTeamInfo from "./store/edit-team-info.reducer";
import { EffectsModule } from "@ngrx/effects";
import { EditTeamInfoEffects } from "./store/edit-team-info.effects";
import { LoadingSpinnerModule } from "../../../../../components/loading-spinner/loading-spinner.module";
import { EditTeamFormModule } from "../../components/edit-team-form/edit-team-form.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        StoreModule.forFeature("editTeamInfo", editTeamInfo.reducer),
        EffectsModule.forFeature([EditTeamInfoEffects]),
        LoadingSpinnerModule,
        EditTeamFormModule
    ],
    declarations: [EditTeamInfoComponent],
    entryComponents: [EditTeamInfoComponent]
})
export class EditTeamInfoModule {
}
