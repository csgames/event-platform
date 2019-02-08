import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getActivities, getScheduleLoading } from "./store/schedule.reducer";
import { LoadActivities } from "./store/schedule.actions";
import { Subscription } from "rxjs";
import { ScheduleService } from "src/app/providers/schedule.service";

@Component({
    selector: "app-schedule",
    templateUrl: "schedule.template.html",
    styleUrls: ["schedule.style.scss"]
})
export class ScheduleComponent implements OnInit, OnDestroy {
    activities$ = this.store$.pipe(select(getActivities));
    loading$ = this.store$.pipe(select(getScheduleLoading));

    private activitiesSub: Subscription;
    public dates: String[];

    constructor(private store$: Store<State>,
                private scheduleService: ScheduleService) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
        this.activitiesSub = this.activities$.subscribe((activities) => {
            const activitiesPerDay = this.scheduleService.getActivitiesPerDay(activities);
            this.dates = Object.keys(activitiesPerDay);
            console.log(this.dates)
        });
    }

    public ngOnDestroy() {
        this.activitiesSub.unsubscribe();
    }
}