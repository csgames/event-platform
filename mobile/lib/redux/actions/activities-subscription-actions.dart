class SubscribeAction {
    final String activityId;
    final String attendeeId;

    SubscribeAction(this.activityId, this.attendeeId);
}

class NotSubscribedAction {
    final String activityId;
    NotSubscribedAction(this.activityId);
}

class SubscribedAction {
    final bool isSubscribed;
    final String activityId;

    SubscribedAction(this.activityId, this.isSubscribed);
}

class VerifySubscriptionAction {
    final String activityId;
    final String attendeeId;

    VerifySubscriptionAction(this.activityId, this.attendeeId);
}