import 'dart:async';
import 'dart:convert';
import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/domain/sponsors.dart';
import 'package:CSGamesApp/services/csgames.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/event.dart';

class EventsService extends CSGamesApi {
  HttpClient _httpClient;


  EventsService(this._httpClient) : super("event");

  Future<Guide> getGuide() async {
      final response = await this._httpClient.get(url('guide'));
      var responseMap = json.decode(response.body);
      return Guide.fromMap(responseMap);
  }

  Future<List<Event>> getAllEvents() async {
    final response = await _httpClient.get(url(), headers: {"With-Event": "false"});
    final responseMap = json.decode(response.body);
    return List.castFrom<dynamic, Event>(responseMap.map((e) => Event.fromMap(e)).toList());
  }

  Future<Event> getEventById(String id) async {
    try {
      final response = await _httpClient.get(url('$id'));
      final responseMap = json.decode(response.body);
      return Event.fromMap(responseMap['event']);
    }
    catch (e) {
      print('EventsService.getEventById(): $e');
      return null;
    }
  }

  Future<List<Activity>> getActivitiesForEvent(String eventId) async {
    final res = await _httpClient.get(url('activity'))
        .then((r) => json.decode(r.body));
    return List.castFrom<dynamic, Activity>(res.map((a) => Activity.fromMap(a)).toList());
  }

  Future<bool> addScannedAttendee(String attendeeId, String scannedAttendeeId) async {
    try {
      final body = {'scannedAttendee': scannedAttendeeId};
      final response = await _httpClient.put(url('$attendeeId/scan'), body: body);
      return response.statusCode == 200;
    } catch (err) {
      print('AttendeesService.addScannedAttendee(): $err');
      return false;
    }
  }

    Future<List<AppNotification>> getNotificationsForEvent() async {
        final response = await _httpClient.get(url('notification'));
        final responseMap = json.decode(response.body);
        List<AppNotification> notifications = [];
        for (var n in responseMap) {
            notifications.add(AppNotification.fromMap(n));
        }
        return notifications;
    }

    Future<int> getUnseenNotification() async {
        final response = await _httpClient.get(
            url('notification?seen=false')
        );

        final responseMap = json.decode(response.body);
        List<AppNotification> unseen = [];
        for (var n in responseMap) {
            unseen.add(AppNotification.fromMap(n));
        }
        return unseen.length;
    }
    
    Future<Map<String, List<Sponsors>>> getAllSponsors() async {
        final response = await this._httpClient.get(url('sponsor'));
        final responseMap = json.decode(response.body);
        Map<String, List<Sponsors>> result = {};
        if (responseMap.containsKey('Platinum')) {
            result['Platinum'] = [];
            for (var s in responseMap['Platinum']) {
                result['Platinum'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Gold')) {
            result['Gold'] = [];
            for (var s in responseMap['Gold']) {
                result['Gold'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Silver')) {
            result['Silver'] = [];
            for (var s in responseMap['Silver']) {
                result['Silver'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Bronze')) {
            result['Bronze'] = [];
            for (var s in responseMap['Bronze']) {
                result['Bronze'].add(Sponsors.fromMap(s));
            }
        }

        return result;
    }

    Future<bool> sendSms(String message) async {
        final body = {'text': message};
        final response = await _httpClient.post(
            url('sms'),
            body: body
        );
        return response.statusCode == 201;
    }
    
    Future<bool> sendPushToEvent(String title, String content) async {
        final body = {'title': title, 'body': content};
        final response = await _httpClient.post(
            url('notification'),
            body: body
        );
        return response.statusCode == 201;
    }
}