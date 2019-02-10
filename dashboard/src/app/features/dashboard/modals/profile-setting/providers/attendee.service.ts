import { Injectable } from "@angular/core";
import { ApiService } from "../../../../../api/api.service";
import { Observable } from "rxjs";
import { Attendee } from "../../../../../api/models/attendee";
import { UppyFile } from "@uppy/core";

@Injectable()
export class AttendeeService {
    constructor(private api: ApiService) {
    }

    public getCvLink(): Observable<string> {
        return this.api.attendee.getCvLink();
    }

    public update(attendee: Attendee): Observable<void> {
        let file: File = null;
        if (attendee.cv && typeof attendee.cv !== "string") {
            file = (attendee.cv as UppyFile).data as File;
            delete attendee.cv;
        }

        return this.api.attendee.update(attendee, file);
    }

    public markNotificationAsSeen(id: string): Observable<void> {
        return this.api.attendee.markNotificationAsSeen(id);
    }
}
