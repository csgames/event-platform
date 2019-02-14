import { Action } from "@ngrx/store";
import { SubscriptionDto } from "../dto/subscription.dto";

export enum InfoActivityActionTypes {
    SubscribeToActivity = "[InfoActivity] Subscribe to activity",
    SubscribedToActivity = "[InfoActivity] Subscribed to activity",
    CheckIfSubscribedToActivity = "[InfoActivity] Check if subscribe to Activity",
    SubscriptionError = "[InfoActivity] Subscription error",
    NotSubscribedToActivity = "[InfoActivity] Not subscribed to activity",
    ResetStore = "[InfoActivity] Reset Store"
}

export class SubscribeToActivity implements Action {
    readonly type = InfoActivityActionTypes.SubscribeToActivity;

    constructor(public activityId: string) { }
}

export class SubscribedToActivity implements Action {
    readonly type = InfoActivityActionTypes.SubscribedToActivity;
}

export class CheckIfSubscribedToActivity implements Action {
    readonly type = InfoActivityActionTypes.CheckIfSubscribedToActivity;

    constructor(public subscription: SubscriptionDto) { }
}

export class SubscriptionError implements Action {
    readonly type = InfoActivityActionTypes.SubscriptionError;
}

export class NotSubscribedToActivity implements Action {
    readonly type = InfoActivityActionTypes.NotSubscribedToActivity;
}

export class ResetStore implements Action {
    readonly type =  InfoActivityActionTypes.ResetStore;
}

export type InfoActivityActions =
    | SubscribeToActivity
    | SubscribedToActivity
    | CheckIfSubscribedToActivity
    | SubscriptionError
    | NotSubscribedToActivity
    | ResetStore;
