import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Activity } from "../api/models/activity";
import { Observable } from "rxjs";

@Injectable()
export class ScheduleService {
    constructor(private apiService: ApiService) { }

    public getActivitiesForEvent(): Observable<Activity[]> {
        return this.apiService.event.getActivitiesForEvent();
    }
}