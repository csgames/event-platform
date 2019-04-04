import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Activity, CreateActivity } from "../api/models/activity";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { ActivityUtils } from "../utils/activity.utils";

@Injectable()
export class ScheduleService {
    constructor(private apiService: ApiService,
                private translateService: TranslateService) { }

    public getActivitiesForEvent(): Observable<Activity[]> {
        return this.apiService.event.getActivitiesForEvent();
    }

    public getActivitiesPerDay(activities: Activity[]): { [date: string]: { [time: string]: Activity[] } } {
        const dates: { [date: string]: { [time: string]: Activity[] } } = {};
        for (const a of activities.filter(activity => !activity.hidden)) {
            const date = new Date(a.beginDate);
            const day = formatDate(date, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
            const time = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), "utc");
            if (!dates[day]) { dates[day] = {}; }
            if (!dates[day][time]) { dates[day][time] = []; }
            dates[day][time].push(a);
        }
        return dates;
    }

    public getNextActivities(activities: Activity[]): Activity[] {
        const sorted = activities.filter(a => !a.hidden).sort((a, b) => a.beginDate < b.beginDate ? -1 : 1);
        const now = new Date();
        const nextActivities = [];
        for (const a of sorted) {
            const date = new Date(a.beginDate);
            if (now <= date) {
                if (nextActivities.length === 0) {
                    nextActivities.push(a);
                } else {
                    const first = new Date(nextActivities[0].beginDate);
                    const day1 = formatDate(first, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time1 = formatDate(first, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    const day2 = formatDate(date, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time2 = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    if (day1 === day2 && time1 === time2) {
                        nextActivities.push(a);
                    }
                }
            }
        }
        return nextActivities;
    }

    private getDateFormat(): string {
        if (this.translateService.getDefaultLang() === "en") {
            return "MMMM d";
        }

        return "d MMMM";
    }

    public createActivity(activity: CreateActivity) {
        return this.apiService.event.createActivity(ActivityUtils.createTimeActivity(activity));
    }
}
