import { NgModule } from "@angular/core";

import { ProfileSettingComponent } from "./profile-setting.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/profile-setting.reducer";
import { CommonModule } from "@angular/common";
import { AttendeeFormModule } from "../../../../components/attendee-form/attendee-form.module";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AttendeeService } from "./providers/attendee.service";
import { EffectsModule } from "@ngrx/effects";
import { ProfileSettingEffects } from "./store/profile-setting.effects";
import { LoadingSpinnerModule } from "../../../../components/loading-spinner/loading-spinner.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StoreModule.forFeature("profileSetting", reducers),
        EffectsModule.forFeature([ProfileSettingEffects]),
        AttendeeFormModule,
        TranslateModule,
        LoadingSpinnerModule
    ],
    declarations: [ProfileSettingComponent],
    entryComponents: [ProfileSettingComponent],
    providers: [AttendeeService]
})
export class ProfileSettingModule {
}
