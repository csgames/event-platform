import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { AttendeeNotification } from "../../app/api/models/notification";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {
    constructor(private apiService: ApiService) { }
    
    public checkUnseenNotification(): Observable<AttendeeNotification[]> {
        return this.apiService.event.checkUnseenNotifications();
    }

    public loadNotifications(): Observable<AttendeeNotification[]> {
        return this.apiService.event.getNotifications();
    }

    public sendSms(text: string) {
        return this.apiService.event.sendSms(text);
    }

    public sendPushToEvent(title: string, body: string) {
        return this.apiService.event.sendPush(title, body);
    }

    public sendPushToActivity(title: string, body: string, activityId: string) {
        return this.apiService.activity.sendPushToActivity(title, body, activityId);
    }
}
