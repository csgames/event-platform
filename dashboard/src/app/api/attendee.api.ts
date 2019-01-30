import { CSGamesApi } from "./csgames.api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attendee } from "./models/attendee";

@Injectable()
export class AttendeeApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("attendee");
    }

    public getAttendeeInfo(): Observable<Attendee> {
        return this.http.get<Attendee>(this.url("info"), { withCredentials: true });
    }

    public updateAttendeeInfo(attendee: Attendee): Observable<void> {
        return;
    }
}
