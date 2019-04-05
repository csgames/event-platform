import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Attendee } from "../api/models/attendee";

@Injectable()
export class AttendeeService {
    constructor(private apiService: ApiService) {
    }

    getAttendeeInfo(): Observable<Attendee> {
        return this.apiService.attendee.getAttendeeInfo();
    }

    addMessagingToken(token: string): Observable<void> {
        return this.apiService.attendee.addMessagingToken(token);
    }

    removeMessagingToken(token: string): Observable<void> {
        return this.apiService.attendee.removeMessagingToken(token);
    }

    getAttendeeCvLink(id: string): Observable<string> {
        return this.apiService.attendee.getAttendeeCvLink(id);
    }
}
