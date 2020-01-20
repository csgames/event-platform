import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/states/notification-state.dart';
import 'package:redux/redux.dart';

final notificationReducer = combineReducers<NotificationState>([
  TypedReducer<NotificationState, LoadNotificationsAction>(_onLoadNotifications),
  TypedReducer<NotificationState, NotificationsNotLoadedAction>(_onError),
  TypedReducer<NotificationState, NotificationsLoadedAction>(_setNotifications),
  TypedReducer<NotificationState, ResetNotificationsAction>(_setInitial),
  TypedReducer<NotificationState, NotificationNotSentAction>(_onNotificationsNotSent),
  TypedReducer<NotificationState, SmsSentAction>(_onSmsSent),
  TypedReducer<NotificationState, HasUnseenNotificationsAction>(_onHasUnseenNotification),
  TypedReducer<NotificationState, PushSentAction>(_onPushSent)
]);

NotificationState _onLoadNotifications(NotificationState state, LoadNotificationsAction action) {
  return NotificationState.loading();
}

NotificationState _onError(NotificationState state, NotificationsNotLoadedAction action) {
  return NotificationState.error();
}

NotificationState _setNotifications(NotificationState state, NotificationsLoadedAction action) {
  return NotificationState(notifications: action.notifications, isLoading: false, hasErrors: false);
}

NotificationState _setInitial(NotificationState state, ResetNotificationsAction action) {
  return NotificationState.initial();
}

NotificationState _onSmsSent(NotificationState state, SmsSentAction action) {
  return NotificationState.sms();
}

NotificationState _onHasUnseenNotification(NotificationState state, HasUnseenNotificationsAction action) {
  return NotificationState.unseen();
}

NotificationState _onPushSent(NotificationState state, PushSentAction action) {
  return NotificationState.push();
}

NotificationState _onNotificationsNotSent(NotificationState state, NotificationNotSentAction action) {
  return NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: true,
    smsSent: false,
    hasUnseenNotifications: false,
    pushSent: false,
    notificationError: action.error
  );
}