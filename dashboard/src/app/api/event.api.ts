import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "./models/event";
import { map } from "rxjs/operators";
import { AttendeeModel } from "./models/attendee";
import { Team } from "./models/team";

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

    public getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(this.url("team"), {
            withCredentials: true
        });
    }
}
