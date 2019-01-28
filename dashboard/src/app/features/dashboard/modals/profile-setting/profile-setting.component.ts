import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store } from "@ngrx/store";
import {
    getCurrentAttendee,
    getLoading,
    getSaving,
    selectGlobal,
    selectProfileSettingGlobal,
    State
} from "./store/profile-setting.reducer";

@Component({
    selector: "app-profile-setting-modal",
    templateUrl: "profile-setting.template.html"
})
export class ProfileSettingComponent extends SimpleModalComponent<void, void> implements OnInit {
    public loading$ = this.store$.pipe(selectProfileSettingGlobal(getLoading));
    public saving$ = this.store$.pipe(selectProfileSettingGlobal(getSaving));
    public currentAttendee$ = this.store$.pipe(selectGlobal(getCurrentAttendee));

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
    }

    public clickCancel() {
        this.close();
    }
}
