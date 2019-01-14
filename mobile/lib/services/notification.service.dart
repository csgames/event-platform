import 'dart:convert';

import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/services/event-management.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class NotificationService extends EventManagementService {
    HttpClient _httpClient;

    NotificationService(this._httpClient) : super('notification');

    Future<List<AppNotification>> getNotificationsForEvent(String eventId) async {
        final response = await _httpClient.get(this.getEvent(path: '$eventId/notification'));
        final responseMap = json.decode(response.body);
        List<AppNotification> notifications = [];
        for (var n in responseMap) {
            notifications.add(AppNotification.fromMap(n));
        }
        return notifications;
    }

    Future<int> getUnseenNotification(String eventId) async {
        final response = await _httpClient.get(
            this.getEvent(path: '$eventId/notification?seen=false')
        );

        final responseMap = json.decode(response.body);
        List<AppNotification> unseen = [];
        for (var n in responseMap) {
            unseen.add(AppNotification.fromMap(n));
        }
        return unseen.length;
    }

    Future<bool> sendSms(String eventId, String message) async {
        final body = {'text': message};
        final response = await _httpClient.post(
            this.getEvent(path: '$eventId/sms'),
            body: body
        );
        return response.statusCode == 201;
    }

    Future<bool> sendPushToEvent(String eventId, String title, String content) async {
        final body = {'title': title, 'body': content};
        final response = await _httpClient.post(
            this.getEvent(path: '$eventId/notification'),
            body: body
        );
        return response.statusCode == 201;
    }

    Future<bool> sendPushToActivity(String activityId, String title, String content) async {
        final body = {'title': title, 'body': content};
        final response = await _httpClient.post(
            this.getActivity(path: '$activityId/notification'),
            body: body
        );
        return response.statusCode == 201;
    }

    Future<bool> markNotificationAsSeen(String id) async {
        final headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };
        final body = json.encode({'notification': id, 'seen': true});

        final response = await _httpClient.put(
            this.getAttendee(path: 'notification'),
            body: body,
            headers: headers
        );
        return response.statusCode == 200;
    }
}