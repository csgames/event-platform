import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "./models/event";
import { map } from "rxjs/operators";
import { AttendeeModel } from "./models/attendee";
import { EventGuide } from "./models/guide";
import { Sponsors } from "./models/sponsors";
import { Activity } from "./models/activity";
import { Team } from "./models/team";
import { AttendeeNotification } from "./models/notification";


@Injectable()
export class EventApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("event");
    }

    public getEventList(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url(), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        }).pipe(
            map(events => {
                return events.map(e => {
                    e.beginDate = new Date(e.beginDate);
                    e.endDate = new Date(e.endDate);
                    return e;
                });
            })
        );
    }

    public getGuide(): Observable<EventGuide> {
        return this.http.get<EventGuide>(this.url("guide"), {
            withCredentials: true
        });
    }

    public onboardAttendee(attendee: AttendeeModel, file: File) {
        const form = new FormData();
        for (const key in attendee) {
            if (key in attendee) {
                form.append(key, attendee[key]);
            }
        }
        if (file) {
            form.append("file", file);
        }

        return this.http.put<void>(this.url("registration"), form, {
            withCredentials: true
        });
    }

    public getSponsorsList(): Observable<{ [id: string]: Sponsors[] }> {
        return this.http.get<{ [id: string]: Sponsors[] }>(this.url("sponsor"), { withCredentials: true });
    }

    public getActivitiesForEvent(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.url("activity"), { withCredentials: true });
    }

    public getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(this.url("team"), { withCredentials: true });
    }
    
    public checkUnseenNotifications(): Observable<AttendeeNotification[]> {
        return this.http.get<AttendeeNotification[]>(this.url("notification?seen=false"), { withCredentials: true });
    }

    public getNotifications(): Observable<AttendeeNotification[]> {
        return this.http.get<AttendeeNotification[]>(this.url("notification"), { withCredentials: true });
    }
}
