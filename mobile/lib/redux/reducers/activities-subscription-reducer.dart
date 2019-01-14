import 'package:CSGamesApp/redux/actions/activities-subscription-actions.dart';
import 'package:CSGamesApp/redux/states/activities-subscription-state.dart';
import 'package:redux/redux.dart';

final activitiesSubscriptionReducer = combineReducers<ActivitiesSubscriptionState>([
    TypedReducer<ActivitiesSubscriptionState, VerifySubscriptionAction>(_verifySubscription),
    TypedReducer<ActivitiesSubscriptionState, SubscribeAction>(_setLoading),
    TypedReducer<ActivitiesSubscriptionState, NotSubscribedAction>(_setError),
    TypedReducer<ActivitiesSubscriptionState, SubscribedAction>(_setSubscribed)
]);

ActivitiesSubscriptionState _setLoading(ActivitiesSubscriptionState state, SubscribeAction action) {
    final activities = Map<String, ActivitySubscriptionState>.from(state.activities);
    activities[action.activityId] = ActivitySubscriptionState.loading();
    return ActivitiesSubscriptionState(activities);
}

ActivitiesSubscriptionState _setError(ActivitiesSubscriptionState state, NotSubscribedAction action) {
    final activities = Map<String, ActivitySubscriptionState>.from(state.activities);
    activities[action.activityId] = ActivitySubscriptionState.error();
    return ActivitiesSubscriptionState(activities);
}

ActivitiesSubscriptionState _setSubscribed(ActivitiesSubscriptionState state, SubscribedAction action) {
    final activities = Map<String, ActivitySubscriptionState>.from(state.activities);
    activities[action.activityId] = ActivitySubscriptionState(hasErrors: false, isLoading: false, isSubscribed: action.isSubscribed);
    return ActivitiesSubscriptionState(activities);
}

ActivitiesSubscriptionState _verifySubscription(ActivitiesSubscriptionState state, VerifySubscriptionAction action) {
    final activities = Map<String, ActivitySubscriptionState>.from(state.activities);
    activities[action.activityId] = ActivitySubscriptionState.loading();
    return ActivitiesSubscriptionState(activities);
}
