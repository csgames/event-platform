import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getActivities, getScheduleLoading } from "./store/schedule.reducer";
import { LoadActivities } from "./store/schedule.actions";
import { Subscription } from "rxjs";
import { getCurrentEvent } from "src/app/store/app.reducers";

@Component({
    selector: "app-schedule",
    templateUrl: "schedule.template.html",
    styleUrls: ["schedule.style.scss"]
})
export class ScheduleComponent implements OnInit, OnDestroy {
    activities$ = this.store$.pipe(select(getActivities));
    loading$ = this.store$.pipe(select(getScheduleLoading));
    currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    private activitiesSub: Subscription;
    private eventSub$: Subscription;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.eventSub$ = this.currentEvent$.subscribe((event) => {
            if (event) this.store$.dispatch(new LoadActivities(event._id));
        });

        this.activitiesSub = this.activities$.subscribe((activities) => {
            console.log(activities);
        });
    }

    public ngOnDestroy() {
        this.activitiesSub.unsubscribe();
        this.eventSub$.unsubscribe();
    }
}