import { CSGamesApi } from "./csgames.api";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attendee, AttendeeModel } from "./models/attendee";
import { map } from "rxjs/operators";

@Injectable()
export class AttendeeApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("attendee");
    }

    public getAttendeeInfo(): Observable<Attendee> {
        return this.http.get<Attendee>(this.url("info"), { withCredentials: true });
    }

    public getCvLink(): Observable<string> {
        return this.http.get<{ url: string }>(this.url("cv/url"), { withCredentials: true }).pipe(map(x => x.url));
    }

    public update(attendee: AttendeeModel, file: File) {
        const form = new FormData();
        for (const key in attendee) {
            if (key in attendee) {
                form.append(key, attendee[key]);
            }
        }
        if (file) {
            form.append("file", file);
        }

        return this.http.put<void>(this.url(), form, {
            withCredentials: true
        });
    }

    public markNotificationAsSeen(id: string): Observable<void> {
        return this.http.put<void>(this.url("notification"), {
            "notification": id,
            "seen": true
        }, {
            withCredentials: true
        });
    }
}
