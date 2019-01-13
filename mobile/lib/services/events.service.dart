import 'dart:async';
import 'dart:convert';
import 'package:PolyHxApp/utils/http-client.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/utils/environment.dart';

class EventsService {
  HttpClient _httpClient;

  List<Event> _eventsCache;

  EventsService(this._httpClient);

  Future<List<Event>> getAllEvents() async {
    final response = await _httpClient.get('${Environment.eventManagementUrl}/event');
    final responseMap = json.decode(response.body);
    _eventsCache = List.castFrom<dynamic, Event>(responseMap.map((e) => Event.fromMap(e)).toList());
    return _eventsCache;
  }

  Future<Event> getEventById(String id) async {
    try {
      final response = await _httpClient.get('${Environment.eventManagementUrl}/event/$id');
      final responseMap = json.decode(response.body);
      return Event.fromMap(responseMap['event']);
    }
    catch (e) {
      print('EventsService.getEventById(): $e');
      return null;
    }
  }

  Future<List<Activity>> getActivitiesForEvent(String eventId) async {
    final res = await _httpClient.get('${Environment.eventManagementUrl}/event/$eventId/activity')
        .then((r) => json.decode(r.body));
    return List.castFrom<dynamic, Activity>(res.map((a) => Activity.fromMap(a)).toList());
  }
  
  Future<User> doRaffle(String activityId) async {
    final response = await _httpClient.get('${Environment.eventManagementUrl}/activity/$activityId/raffle');
    final responseMap = json.decode(response.body);
    return User.fromMap(responseMap);
  }

  Future<bool> setAttendeeAsPresent(String eventId, String attendeeId) async {
    try {
      final response = await _httpClient.put('${Environment.eventManagementUrl}/event/$eventId/$attendeeId/present');
      return response.statusCode == 200;
    }
    catch (e) {
      print('AttendeesService.addAttendeeToActivity(): $e');
      return false;
    }
  }

  Future<bool> addScannedAttendee(String attendeeId, String scannedAttendeeId, String eventId) async {
    try {
      final body = {'scannedAttendee': scannedAttendeeId};
      final response = await _httpClient.put('${Environment.eventManagementUrl}/event/$eventId/$attendeeId/scan', body: body);
      return response.statusCode == 200;
    } catch (err) {
      print('AttendeesService.addScannedAttendee(): $err');
      return false;
    }
  }
}