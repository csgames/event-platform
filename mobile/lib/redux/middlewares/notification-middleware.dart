import 'dart:io';

import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/activities.service.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

Future<dynamic> backgroundMessageHandler(Map<String, dynamic> message) {
    if (message.containsKey('data')) {
        // Handle data message
        final dynamic data = message['data'];
    }

    if (message.containsKey('notification')) {
        // Handle notification message
        final dynamic notification = message['notification'];
    }

    // Or do other work.
}

class NotificationMiddleware implements EpicClass<AppState> {
    final FirebaseMessaging _firebaseMessaging;
    final AttendeesService _attendeesService;
    final EventsService _eventService;
    final ActivitiesService _activitiesService;

    NotificationMiddleware(this._firebaseMessaging, this._attendeesService, this._eventService, this._activitiesService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<LoadNotificationsAction>())
                .switchMap((action) => _fetchNotifications()),
            Observable(actions)
                .ofType(TypeToken<SendSmsAction>())
                .switchMap((action) => _sendSms(action.message)),
            Observable(actions)
                .ofType(TypeToken<SetupNotificationAction>())
                .switchMap((action) => _setupNotifications()),
            Observable(actions)
                .ofType(TypeToken<CheckUnseenNotificationsAction>())
                .switchMap((action) => _checkUnseenNotifications()),
            Observable(actions)
                .ofType(TypeToken<SendPushAction>())
                .switchMap((action) => _sendPush(action.title, action.body, action.activity))
        ]);
    }

    Stream<dynamic> _fetchNotifications() async* {
        List<AppNotification> notifications = [];
        try {
            notifications = await _eventService.getNotificationsForEvent();
            yield NotificationsLoadedAction(notifications);
        } catch (err) {
            print('An error occured while getting the notifications: $err');
            yield NotificationsNotLoadedAction();
        }

        try {
            for (AppNotification n in notifications) {
                if (!n.seen) await _attendeesService.markNotificationAsSeen(n.id);
            }
        } catch (err) {
            print('An error occured while marking the notification as seen $err');
        }
    }

    Stream<dynamic> _sendSms(String message) async* {
        try {
            bool result = await _eventService.sendSms(message);
            if (result)
                yield SmsSentAction();
            else
                yield NotificationNotSentAction('An error occured while sending the sms.');
        } catch (err) {
            print('An error occured while sending the sms : $err');
            yield NotificationNotSentAction(err);
        }
    }

    Stream<dynamic> _sendPush(String title, String body, Activity activity) async* {
        try {
            bool result;
            if (activity.name["en"] == 'Event')
                result = await _eventService.sendPushToEvent(title, body);
            else
                result = await _activitiesService.sendPushToActivity(activity.id, title, body);

            if (result)
                yield PushSentAction();
            else
                yield NotificationNotSentAction('An error occured while sending the push notification.');
        } catch (err) {
            print('An error occured while sending the push notification : $err');
            yield NotificationNotSentAction(err);
        }
    }

    Stream<dynamic> _setupNotifications() async* {
        try {

            if (Platform.isIOS) {
                _firebaseMessaging.requestNotificationPermissions(IosNotificationSettings(sound: true, badge: true, alert: true));
                _firebaseMessaging.onIosSettingsRegistered
                    .listen((IosNotificationSettings settings) => print('Settings registered: $settings'));
            }

            _firebaseMessaging.configure(
                onBackgroundMessage: backgroundMessageHandler,
                onMessage: (Map<String, dynamic> message) async {
                    print('on message $message');
                },
                onResume: (Map<String, dynamic> message) async {
                    print('on resume $message');
                },
                onLaunch: (Map<String, dynamic> message) async {
                    print('on launch $message');
                }
            );

            String token = await _firebaseMessaging.getToken();
            await _attendeesService.setFcmToken(token);
        } catch (err) {
            print('An error occured while doing the setup of the notifications $err');
        }
    }

    Stream<dynamic> _checkUnseenNotifications() async* {
        try {
            int unseen = await _eventService.getUnseenNotification();
            if (unseen > 0) yield HasUnseenNotificationsAction();
        } catch (err) {
            print('An error occured while checking if the user has unseen notifications $err');
        }
    }
}