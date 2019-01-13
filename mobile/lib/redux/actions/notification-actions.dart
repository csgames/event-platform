import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/notification.dart';

class LoadNotificationsAction {
  final String eventId;
  
  LoadNotificationsAction(this.eventId);
}

class NotificationsLoadedAction {
  final List<AppNotification> notifications;

  NotificationsLoadedAction(this.notifications);
}

class NotificationsNotLoadedAction {}

class ResetNotificationsAction {}

class SendSmsAction {
  final String eventId;
  final String message;

  SendSmsAction(this.eventId, this.message);
}

class SmsSentAction {}

class SetupNotificationAction {}

class CheckUnseenNotificationsAction {
  final String eventId;

  CheckUnseenNotificationsAction(this.eventId);
}

class HasUnseenNotificationsAction {}

class SendPushAction {
  final String eventId;
  final String title;
  final String body;
  final Activity activity;

  SendPushAction(this.eventId, this.title, this.body, this.activity);
}

class PushSentAction {}

class NotificationNotSentAction {
  final error;

  NotificationNotSentAction(this.error);
}