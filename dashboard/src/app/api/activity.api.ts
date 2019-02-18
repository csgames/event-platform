import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { SubscriptionDto } from "../features/schedule/info-activity/dto/subscription.dto";
import { Injectable } from "@angular/core";

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
}
