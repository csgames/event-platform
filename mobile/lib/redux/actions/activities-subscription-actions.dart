class SubscribeAction {
    final String activityId;

    SubscribeAction(this.activityId);
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

    VerifySubscriptionAction(this.activityId);
}