import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingSpinnerModule } from "../../../../components/loading-spinner/loading-spinner.module";
import { ActivityFormModule } from "../activity-form/activity-form.module";
import { EditActivityEffects } from "./store/edit-activity.effects";
import * as fromEditActivity from "./store/edit-activity.reducer";
import { EditActivityComponent } from "./edit-activity.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ActivityFormModule,
        LoadingSpinnerModule,
        FlexLayoutModule,
        StoreModule.forFeature("editActivity", fromEditActivity.reducer),
        EffectsModule.forFeature([EditActivityEffects])
    ],
    declarations: [EditActivityComponent],
    entryComponents: [EditActivityComponent]
})
export class EditActivityModule {}
