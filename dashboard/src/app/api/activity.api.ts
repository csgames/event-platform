import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { SubscriptionDto } from "../features/schedule/info-activity/dto/subscription.dto";
import { Injectable } from "@angular/core";
import { CreateActivity } from "./models/activity";
import { Observable } from "rxjs";

@Injectable()
export class ActivityApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("activity");
    }

    public addSubscriptionToActivity(subscription: SubscriptionDto) {
        return this.http.put(this.url(`${subscription.activityId}/${subscription.attendeeId}/subscription`), {}, {
            withCredentials: true
        });
    }

    public verifyAttendeeSubscription(subscription: SubscriptionDto) {
        return this.http.get(this.url(`${subscription.activityId}/${subscription.attendeeId}/subscription`), {
            withCredentials: true
        });
    }

    public sendPushToActivity(title: string, body: string, activityId: string) {
        return this.http.post<void>(this.url(`${activityId}/notification`), {
            title,
            body
        }, {
            withCredentials: true
        });
    }

    public updateActivity(activityId: string, dto: CreateActivity): Observable<void> {
        return this.http.put<void>(this.url(`${activityId}`), dto, { withCredentials: true });
    }
}
