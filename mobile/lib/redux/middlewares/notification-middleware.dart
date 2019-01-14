import 'dart:io';

import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/notification.service.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationMiddleware implements EpicClass<AppState> {
    final NotificationService _notificationService;
    final FirebaseMessaging _firebaseMessaging;
    final AttendeesService _attendeesService;

    NotificationMiddleware(this._notificationService, this._firebaseMessaging, this._attendeesService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<LoadNotificationsAction>())
                .switchMap((action) => _fetchNotifications(action.eventId)),
            Observable(actions)
                .ofType(TypeToken<SendSmsAction>())
                .switchMap((action) => _sendSms(action.eventId, action.message)),
            Observable(actions)
                .ofType(TypeToken<SetupNotificationAction>())
                .switchMap((action) => _setupNotifications()),
            Observable(actions)
                .ofType(TypeToken<CheckUnseenNotificationsAction>())
                .switchMap((action) => _checkUnseenNotifications(action.eventId)),
            Observable(actions)
                .ofType(TypeToken<SendPushAction>())
                .switchMap((action) => _sendPush(action.eventId, action.title, action.body, action.activity))
        ]);
    }

    Stream<dynamic> _fetchNotifications(String eventId) async* {
        List<AppNotification> notifications = [];
        try {
            notifications = await _notificationService.getNotificationsForEvent(eventId);
            yield NotificationsLoadedAction(notifications);
        } catch (err) {
            print('An error occured while getting the notifications: $err');
            yield NotificationsNotLoadedAction();
        }

        try {
            for (AppNotification n in notifications) {
                if (!n.seen) await _notificationService.markNotificationAsSeen(n.id);
            }
        } catch (err) {
            print('An error occured while marking the notification as seen $err');
        }
    }

    Stream<dynamic> _sendSms(String eventId, String message) async* {
        try {
            bool result = await _notificationService.sendSms(eventId, message);
            if (result)
                yield SmsSentAction();
            else
                yield NotificationNotSentAction('An error occured while sending the sms.');
        } catch (err) {
            print('An error occured while sending the sms : $err');
            yield NotificationNotSentAction(err);
        }
    }

    Stream<dynamic> _sendPush(String eventId, String title, String body, Activity activity) async* {
        try {
            bool result;
            if (activity.name == 'Event')
                result = await _notificationService.sendPushToEvent(eventId, title, body);
            else
                result = await _notificationService.sendPushToActivity(activity.id, title, body);

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
            var flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
            var initializationSettingsAndroid = new AndroidInitializationSettings('app_icon');
            var initializationSettingsIOS = new IOSInitializationSettings();
            var initializationSettings = new InitializationSettings(initializationSettingsAndroid, initializationSettingsIOS);
            flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
            flutterLocalNotificationsPlugin.initialize(initializationSettings, onSelectNotification: (r) {});

            var androidPlatformChannelSpecifics = new AndroidNotificationDetails(
                'polyhx', 'polyhx', 'PolyHx Channel',
                importance: Importance.Default, priority: Priority.Default);
            var iOSPlatformChannelSpecifics = new IOSNotificationDetails();
            var platformChannelSpecifics = new NotificationDetails(
                androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);

            if (Platform.isIOS) {
                _firebaseMessaging.requestNotificationPermissions(IosNotificationSettings(sound: true, badge: true, alert: true));
                _firebaseMessaging.onIosSettingsRegistered
                    .listen((IosNotificationSettings settings) => print('Settings registered: $settings'));
            }

            _firebaseMessaging.configure(
                onMessage: (Map<String, dynamic> message) async {
                    print('on message $message');
                    await flutterLocalNotificationsPlugin.show(0, message['notification']['title'], message['notification']['body'], platformChannelSpecifics);
                },
                onResume: (Map<String, dynamic> message) async {
                    print('on resume $message');
//                    _showToast(message['notification']['title'], message['notification']['body']);
                },
                onLaunch: (Map<String, dynamic> message) async {
                    print('on launch $message');
//                    _showToast(message['notification']['title'], message['notification']['body']);
                }
            );

            String token = await _firebaseMessaging.getToken();
            await _attendeesService.setFcmToken(token);
        } catch (err) {
            print('An error occured while doing the setup of the notifications $err');
        }
    }

    void _showToast(String title, String message) {
        Fluttertoast.showToast(
            msg: '$title : $message',
            toastLength: Toast.LENGTH_LONG,
            gravity: ToastGravity.TOP,
            timeInSecForIos: 5
        );
    }

    Stream<dynamic> _checkUnseenNotifications(String eventId) async* {
        try {
            int unseen = await _notificationService.getUnseenNotification(eventId);
            if (unseen > 0) yield HasUnseenNotificationsAction();
        } catch (err) {
            print('An error occured while checking if the user has unseen notifications $err');
        }
    }
}