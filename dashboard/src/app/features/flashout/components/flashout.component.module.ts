import { NgModule } from "@angular/core";

import { FlashoutCardComponent } from "./flashout-card/flashout-card.component";
import { CommonModule } from "@angular/common";
import { YoutubePlayerModule } from "ngx-youtube-player";
import { RatingModule, BsDatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoadingSpinnerModule } from "../../../components/loading-spinner/loading-spinner.module";
import { StoreModule } from "@ngrx/store";
import * as fromFlashoutSettings from "./flashout-settings/store/flashout-settings.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FlashoutSettingsEffects } from "./flashout-settings/store/flashout-settings.effects";
import { FlashoutSettingsComponent } from "./flashout-settings/flashout-settings.component";
import { TranslateModule } from "@ngx-translate/core";
import { FLASHOUT_SETTINGS_FORM_GENERATOR } from "./flashout-settings/flashout-settings.constants";
import { FormGeneratorFactory } from "src/app/form-generator/factory";
import { FlashoutSettingsDto } from "./flashout-settings/dto/flashout-settings.dto";
import { SimpleModalModule } from "ngx-simple-modal";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        YoutubePlayerModule,
        RatingModule.forRoot(),
        FlexLayoutModule,
        LoadingSpinnerModule,
        StoreModule.forFeature("flashoutSettings", fromFlashoutSettings.reducer),
        EffectsModule.forFeature([FlashoutSettingsEffects]),
        BsDatepickerModule,
        TranslateModule,
        TimepickerModule,
        SimpleModalModule
    ],
    declarations: [FlashoutCardComponent, FlashoutSettingsComponent],
    exports: [FlashoutCardComponent],
    entryComponents: [FlashoutSettingsComponent],
    providers: [
        {
            provide: FLASHOUT_SETTINGS_FORM_GENERATOR,
            useFactory: FormGeneratorFactory.transform(FlashoutSettingsDto),
            deps: [FormBuilder]
        }
    ]
})
export class FlashoutComponentModule { }
