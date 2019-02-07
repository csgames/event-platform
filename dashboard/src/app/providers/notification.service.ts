import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Notification} from "../../app/api/models/notification"
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {
    constructor(private apiService: ApiService) { }
    
    public checkUnseenNotification(): Observable<Notification[]> {
        return this.apiService.event.checkUnseenNotifications();
    }

    public loadNotifications(): Observable<Notification[]> {
        return this.apiService.event.getNotifications();
    }
}
