import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { CreateActivity } from "../api/models/activity";
import { ActivityUtils } from "../utils/activity.utils";

@Injectable()
export class ActivityService {
    constructor(private apiService: ApiService) { }

    public updateActivity(activityId: string, activity: CreateActivity) {
        return this.apiService.activity.updateActivity(activityId, ActivityUtils.createTimeActivity(activity));
    }
}
