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
}
