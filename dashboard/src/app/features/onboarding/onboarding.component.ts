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
import { Event } from "../../api/models/event";

@Component({
    selector: "app-onboarding",
    templateUrl: "onboarding.template.html",
    styleUrls: ["onboarding.style.scss"]
})
export class OnboardingComponent implements OnInit, OnDestroy {
    @ViewChild(AttendeeFormComponent)
    private attendeeForm: AttendeeFormComponent;

    currentAttendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));
    currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));
    
    public currentAttendee: Attendee;
    public currentEvent: Event;
    private currentAttendeeSub$: Subscription;
    private currentEvenSub$: Subscription;

    constructor(private store$: Store<State>) {}

    public ngOnInit() {
        this.currentAttendeeSub$ = this.currentAttendee$.subscribe((attendee) => {
            this.currentAttendee = attendee;
        });
        this.currentEvenSub$ = this.currentEvent$.subscribe((event) => {
            this.currentEvent = event;
        });
    }

    public ngOnDestroy() {
        this.currentAttendeeSub$.unsubscribe();
        this.currentEvenSub$.unsubscribe();
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
        //Validate other shit
        this.store$.dispatch(new OnboardAttendee({
            attendee: this.currentAttendee,
            eventId: this.currentEvent._id
        }));
    }
}