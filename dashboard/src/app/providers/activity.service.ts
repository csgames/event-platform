import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { CreateActivity } from "../api/models/activity";

@Injectable()
export class ActivityService {
    constructor(private apiService: ApiService) { }

    public updateActivity(activityId: string, activity: CreateActivity) {
        return this.apiService.activity.updateActivity(activityId, activity);
    }
}
