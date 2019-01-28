import { Injectable } from "@angular/core";
import { EventApi } from "../api/event.api";
import { Event } from "../api/models/event";
import { Observable } from "rxjs";

const CURRENT_EVENT = "CURRENT_EVENT";

@Injectable()
export class EventService {
    constructor(private eventApi: EventApi) {}

    public getEventList(): Observable<Event[]> {
        return this.eventApi.getEventList();
    }

    public saveCurrentEvent(eventId: string) {
        localStorage.setItem(CURRENT_EVENT, eventId);
    }

    public getCurrentEvent(): string {
        return localStorage.getItem(CURRENT_EVENT);
    }
}
