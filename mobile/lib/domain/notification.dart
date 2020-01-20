import 'dart:convert';

import 'package:CSGamesApp/domain/activity.dart';

class NotificationTypes {
    static const String Event = "event";
    static const String Activity = "activity";
}

class AppNotification {
    String id;
    String title;
    String body;
    String type;
    Activity activity;
    DateTime date;
    bool seen;

    AppNotification({
        this.id,
        this.title,
        this.body,
        this.activity,
        this.date,
        this.seen
    });

    AppNotification.fromMap(Map<String, dynamic> map) {
        id = map['notification']['_id'];
        title = map['notification']['title'];
        body = map['notification']['body'];
        activity = map["notification"]["data"]["activity"] != null ? Activity.fromNotificationData(json.decode(map["notification"]["data"]["activity"])) : null;
        date = DateTime.parse(map['notification']['timestamp']);
        seen = map['seen'] == true;
        type = map['notification']['data']['type'];
    }
}