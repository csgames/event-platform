import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getActivities, getScheduleLoading } from "./store/schedule.reducer";
import { LoadActivities, ShowActivityInfo } from "./store/schedule.actions";
import { Subscription } from "rxjs";
import { ScheduleService } from "src/app/providers/schedule.service";
import { Activity } from "src/app/api/models/activity";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-schedule",
    templateUrl: "schedule.template.html",
    styleUrls: ["schedule.style.scss"]
})
export class ScheduleComponent implements OnInit, OnDestroy {
    activities$ = this.store$.pipe(select(getActivities));
    loading$ = this.store$.pipe(select(getScheduleLoading));

    private activities: Activity[];
    private activitiesSub$: Subscription;
    private defaultLangSub$: Subscription;
    public dates: string[];
    public activitiesPerDay: { [date: string]: { [time: string]: Activity[] } };

    constructor(private store$: Store<State>,
                private scheduleService: ScheduleService,
                private translateService: TranslateService) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
        this.activitiesSub$ = this.activities$.subscribe((activities) => {
            this.activities = activities;
            [this.activitiesPerDay, this.dates] = this.scheduleService.getActivitiesPerDay(activities);
        });
        this.defaultLangSub$ = this.translateService.onDefaultLangChange.subscribe(() => {
            [this.activitiesPerDay, this.dates] = this.scheduleService.getActivitiesPerDay(this.activities);
        });
    }

    public ngOnDestroy() {
        this.activitiesSub$.unsubscribe();
        this.defaultLangSub$.unsubscribe();
    }
    
    public getSortedKeysForDaySchedule(day: { [id: string]: Activity[] }): string[] {
        let list = Object.keys(day);
        list = list.sort((t1, t2) => {
            const activity1 = day[t1][0];
            const activity2 = day[t2][0];
            return activity1.beginDate < activity2.beginDate ? -1 : 1;
        });
        return list;
    }

    public onShowInfo(activity: Activity, time: string) {
        this.store$.dispatch(new ShowActivityInfo({activity, time}));
    }
}
