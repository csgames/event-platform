import { Injectable } from "@angular/core";
import { Event } from "../api/models/event";
import { Observable } from "rxjs";
import { Attendee } from "../api/models/attendee";
import { ApiService } from "../api/api.service";
import { UppyFile } from "@uppy/core";

const CURRENT_EVENT = "CURRENT_EVENT";

@Injectable()
export class EventService {
    constructor(private apiService: ApiService) {}

    public getEventList(): Observable<Event[]> {
        return this.apiService.event.getEventList();
    }

    public saveCurrentEvent(eventId: string) {
        localStorage.setItem(CURRENT_EVENT, eventId);
    }

    public getCurrentEvent(): string {
        return localStorage.getItem(CURRENT_EVENT);
    }
    
    public onboardAttendee(attendee: Attendee): Observable<void> {
        let file: File = null;
        if (attendee.cv && typeof attendee.cv !== "string") {
            file = (attendee.cv as UppyFile).data as File;
            delete attendee.cv;
        }

        return this.apiService.event.onboardAttendee(attendee, file);
    }
}
