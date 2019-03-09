import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api/api.service";
import * as fromCompetition from "../dto/subscription.dto";
import * as fromActivity from "src/app/features/schedule/info-activity/dto/subscription.dto";

@Injectable()
export class SubscriptionService {
    constructor(private api: ApiService) { }

    public checkIfSubscribed(dto: fromActivity.SubscriptionDto) {
        return this.api.activity.verifyAttendeeSubscription(dto);
    }

    public addSubscription(dto: fromCompetition.SubscriptionDto) {
        return this.api.competition.addSubscriptionToCompetition(dto);
    }

}
