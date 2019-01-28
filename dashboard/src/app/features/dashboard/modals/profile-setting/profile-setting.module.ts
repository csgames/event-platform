import { NgModule } from "@angular/core";

import { ProfileSettingComponent } from "./profile-setting.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/profile-setting.reducer";
import { CommonModule } from "@angular/common";
import { AttendeeFormModule } from "../../../../components/attendee-form/attendee-form.module";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("profileSetting", reducers),
        AttendeeFormModule
    ],
    declarations: [ProfileSettingComponent],
    entryComponents: [ProfileSettingComponent]
})
export class ProfileSettingModule {
}
