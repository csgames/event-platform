import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
import { Attendee } from "../../../../api/models/attendee";
import { Subscription } from "rxjs";
import { AttendeeFormComponent } from "../../../../components/attendee-form/attendee-form.component";
import { UppyFile } from "@uppy/core";
import { FileUtils } from "../../../../utils/file.utils";
import { DownloadCv, UpdateAttendee } from "./store/profile-setting.actions";

@Component({
    selector: "app-profile-setting-modal",
    templateUrl: "profile-setting.template.html"
})
export class ProfileSettingComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(AttendeeFormComponent)
    private attendeeForm: AttendeeFormComponent;

    public loading$ = this.store$.pipe(selectProfileSettingGlobal(getLoading));
    public saving$ = this.store$.pipe(selectProfileSettingGlobal(getSaving));
    public currentAttendee$ = this.store$.pipe(selectGlobal(getCurrentAttendee));

    public currentAttendee: Attendee;

    private currentAttendeeSub$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.currentAttendeeSub$ = this.currentAttendee$.subscribe((attendee) => {
            this.currentAttendee = attendee;
        });
    }

    public ngOnDestroy() {
        this.currentAttendeeSub$.unsubscribe();
        super.ngOnDestroy();
    }

    public downloadCv() {
        const data = this.currentAttendee.cv as (string | UppyFile);
        if (typeof data === "string") {
            this.store$.dispatch(new DownloadCv());
        } else {
            FileUtils.downloadFile(data.name, data.data);
        }
    }

    public clickCancel() {
        this.close();
    }

    public clickSave() {
        if (this.attendeeForm.validate()) {
           this.store$.dispatch(new UpdateAttendee(this.currentAttendee));
        }
    }
}
