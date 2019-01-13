import 'package:meta/meta.dart';

@immutable
class ActivitiesSubscriptionState {
    final Map<String, ActivitySubscriptionState> activities;

    ActivitiesSubscriptionState(this.activities);

    factory ActivitiesSubscriptionState.initial() => ActivitiesSubscriptionState(Map<String, ActivitySubscriptionState>());
}

@immutable
class ActivitySubscriptionState {
  final bool isLoading;
  final bool hasErrors;
  final bool isSubscribed;

  ActivitySubscriptionState({this.hasErrors, this.isLoading, this.isSubscribed});

  factory ActivitySubscriptionState.initial() => ActivitySubscriptionState(hasErrors: false, isLoading: false, isSubscribed: false);

  factory ActivitySubscriptionState.loading() => ActivitySubscriptionState(hasErrors: false, isLoading: true, isSubscribed: false);

  factory ActivitySubscriptionState.error() => ActivitySubscriptionState(hasErrors: true, isLoading: true, isSubscribed: false);
}