import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getActivities, getScheduleLoading } from "./store/schedule.reducer";
import { LoadActivities } from "./store/schedule.actions";
import { Subscription } from "rxjs";
import { ScheduleService } from "src/app/providers/schedule.service";
import { Activity } from "src/app/api/models/activity";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoActivityComponent } from "./info-activity/info-activity.component";

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
    public activitiesPerDay: { [date: string]: { [time: string]: Activity[] } };

    constructor(private store$: Store<State>,
                private scheduleService: ScheduleService,
                private modalService: SimpleModalService) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
        this.activitiesSub = this.activities$.subscribe((activities) => {
            this.activitiesPerDay = this.scheduleService.getActivitiesPerDay(activities);
            this.dates = Object.keys(this.activitiesPerDay);
        });
    }

    public ngOnDestroy() {
        this.activitiesSub.unsubscribe();
    }
    
    public getSortedKeysForDaySchedule(day: { [id: string]: Activity[] }): string[] {
        var list = Object.keys(day);
        list = list.sort((t1, t2) => {
            var activity1 = day[t1][0];
            var activity2 = day[t2][0];
            return activity1.beginDate < activity2.beginDate ? -1 : 1;
        });
        return list;
    }

    public onShowInfo(activity: Activity, time: string) {
        this.modalService.addModal(InfoActivityComponent, {activity, time});
    }
}
