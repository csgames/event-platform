import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api/api.service";
import { SubscriptionDto } from "../dto/subscription.dto";

@Injectable()
export class SubscriptionService {
    constructor(private api: ApiService) { }

    public checkIfSubscribed(dto: SubscriptionDto) {
        return this.api.activity.verifyAttendeeSubscription(dto);
    }

    public addSubscription(dto: SubscriptionDto) {
        return this.api.activity.addSubscriptionToActivity(dto);
    }
}