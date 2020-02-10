import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { PipeModule } from "../../../pipe/pipe.module";

import * as fromEventSettings from "./store/event-settings.reducer";
import { EventSettingsComponent } from "./event-settings.component";
import { GeneralSettingsEffects } from "./components/general-settings/store/general-settings.effects";
import { EventEmailTemplateSettingsEffects } from "./components/email-templates/store/email-templates.effects";
import { GeneralSettingsComponent } from "./components/general-settings/general-settings.component";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { EventFormModule } from "../../../components/event-form/event-form.module";
import { EmailTemplatesComponent } from "./components/email-templates/email-templates.component";

@NgModule({
    imports: [
        CommonModule,
        LoadingSpinnerModule,
        TranslateModule,
        EventFormModule,
        FormsModule,
        MonacoEditorModule,

        StoreModule.forFeature("eventSettings", fromEventSettings.eventSettingsReducers),
        EffectsModule.forFeature([GeneralSettingsEffects, EventEmailTemplateSettingsEffects]),
        PipeModule,
        FlexModule
    ],
    declarations: [
        EventSettingsComponent,
        GeneralSettingsComponent,
        EmailTemplatesComponent
    ],
    exports: [EventSettingsComponent]
})
export class EventSettingsModule {
}
