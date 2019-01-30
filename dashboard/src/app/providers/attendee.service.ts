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

    updateAttendee(attendee: Attendee): Observable<void> {
        return this.apiService.attendee.updateAttendeeInfo(attendee);
    }
}
