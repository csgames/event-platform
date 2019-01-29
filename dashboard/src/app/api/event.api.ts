import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "./models/event";
import { map } from "rxjs/operators";

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

}
