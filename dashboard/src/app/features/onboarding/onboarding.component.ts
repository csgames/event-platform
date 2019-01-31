import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { State } from "../../store/app.reducers";
import { AttendeeFormComponent } from "src/app/components/attendee-form/attendee-form.component";
import { DownloadCv, OnboardAttendee } from "./store/onboarding.actions";
import { FileUtils } from "src/app/utils/file.utils";
import { Attendee } from "src/app/api/models/attendee";
import { UppyFile } from "@uppy/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-onboarding",
    templateUrl: "onboarding.template.html",
    styleUrls: ["onboarding.style.scss"]
})
export class OnboardingComponent implements OnInit, OnDestroy {
    @ViewChild(AttendeeFormComponent)
    private attendeeForm: AttendeeFormComponent;

    currentAttendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));
    
    public currentAttendee: Attendee;
    private currentAttendeeSub$: Subscription;

    public acceptedCode = false;

    constructor(private store$: Store<State>,
                private router: Router) {}

    public ngOnInit() {
        this.currentAttendeeSub$ = this.currentAttendee$.subscribe((attendee) => {
            this.currentAttendee = attendee;
        });
    }

    public ngOnDestroy() {
        this.currentAttendeeSub$.unsubscribe();
    }

    public downloadCv() {
        const data = this.currentAttendee.cv as (string | UppyFile);
        if (typeof data === "string") {
            this.store$.dispatch(new DownloadCv());
        } else {
            FileUtils.downloadFile(data.name, data.data);
        }
    }

    saveInfo() {
        if (!this.attendeeForm.validate()) return;
        if (!this.acceptedCode) return;
        this.store$.dispatch(new OnboardAttendee(this.currentAttendee));
    }
}