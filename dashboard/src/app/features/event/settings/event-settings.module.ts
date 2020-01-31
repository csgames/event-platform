import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";

import * as fromEventSettings from "./store/event-settings.reducer";
import { EventSettingsEffects } from "./store/event-settings.effects";
import { EventSettingsComponent } from "./event-settings.component";
import { GeneralSettingsComponent } from "./components/general-settings.component";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { EventFormModule } from "../../../components/event-form/event-form.module";

@NgModule({
    imports: [
        CommonModule,
        LoadingSpinnerModule,
        TranslateModule,
        EventFormModule,
        FormsModule,

        StoreModule.forFeature("eventSettings", fromEventSettings.reducer),
        EffectsModule.forFeature([EventSettingsEffects])
    ],
    declarations: [
        EventSettingsComponent,
        GeneralSettingsComponent
    ],
    exports: [EventSettingsComponent]
})
export class EventSettingsModule {
}
