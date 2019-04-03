import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { LoadingSpinnerModule } from "src/app/components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import * as fromActivities from "./store/activities.reducer";
import { EffectsModule } from "@ngrx/effects";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ActivitiesComponent } from "./activities.component";
import { ActivitiesEffects } from "./store/activities.effects";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { ActivityFormModule } from "./components/activity-form/activity-form.module";
import { ActivityCardModule } from "./components/activity-card/activity-card.module";
import { EditActivityModule } from "./components/edit-activity/edit-activity.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ToastrModule,
        ActivitiesRoutingModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("activities", fromActivities.reducer),
        EffectsModule.forFeature([ActivitiesEffects]),
        DirectivesModule,
        FormsModule,
        NgSelectModule,
        ActivityFormModule,
        ActivityCardModule,
        EditActivityModule
    ],
    declarations: [ActivitiesComponent],
    entryComponents: [ActivitiesComponent]
})
export class ActivitiesModule { }
