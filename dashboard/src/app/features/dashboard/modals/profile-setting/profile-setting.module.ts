import { NgModule } from "@angular/core";

import { ProfileSettingComponent } from "./profile-setting.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/profile-setting.reducer";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("profileSetting", reducers)
    ],
    declarations: [ProfileSettingComponent],
    entryComponents: [ProfileSettingComponent]
})
export class ProfileSettingModule {
}
