import 'package:PolyHxApp/domain/notification.dart';
import 'package:meta/meta.dart';

@immutable
class NotificationState {
  final List<AppNotification> notifications;
  final bool isLoading;
  final bool hasErrors;
  final bool smsSent;
  final bool hasUnseenNotifications;
  final bool pushSent;
  final notificationError;

  NotificationState({
    this.notifications,
    this.isLoading,
    this.hasErrors,
    this.smsSent,
    this.hasUnseenNotifications,
    this.pushSent,
    this.notificationError
  });

  factory NotificationState.initial() => NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: false,
    smsSent: false,
    hasUnseenNotifications: false,
    pushSent: false,
    notificationError: null
  );

  factory NotificationState.loading() => NotificationState(
    notifications: [],
    isLoading: true,
    hasErrors: false,
    smsSent: false,
    hasUnseenNotifications: false,
    pushSent: false,
    notificationError: null
  );

  factory NotificationState.error() => NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: true,
    smsSent: false,
    hasUnseenNotifications: false,
    pushSent: false,
    notificationError: null
  );

  factory NotificationState.sms() => NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: false,
    smsSent: true,
    hasUnseenNotifications: false,
    pushSent: false,
    notificationError: null
  );

  factory NotificationState.unseen() => NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: false,
    smsSent: false,
    hasUnseenNotifications: true,
    pushSent: false,
    notificationError: null
  );

  factory NotificationState.push() => NotificationState(
    notifications: [],
    isLoading: false,
    hasErrors: false,
    smsSent: false,
    hasUnseenNotifications: false,
    pushSent: true,
    notificationError: null
  );
}