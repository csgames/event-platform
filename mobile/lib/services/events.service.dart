import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/environment.dart';

class EventsService {
  Client _http;
  TokenService _tokenService;

  List<Event> _eventsCache;

  EventsService(this._http, this._tokenService);

  Future<List<Event>> getAllEvents() async {
    final response = await _http.get('${Environment.eventManagementUrl}/event',
          headers: {'Authorization': 'Bearer ${_tokenService.accessToken}'});
    final responseMap = json.decode(response.body);
    _eventsCache = List.castFrom<dynamic, Event>(responseMap.map((e) => Event.fromMap(e)).toList());
    return _eventsCache;
  }

  Future<Event> getEventById(String id) async {
    try {
      final response = await _http.get('${Environment.eventManagementUrl}/event/$id',
          headers: {'Authorization': 'Bearer ${_tokenService.accessToken}'});
      final responseMap = json.decode(response.body);
      return Event.fromMap(responseMap['event']);
    }
    catch (e) {
      print('EventsService.getEventById(): $e');
      return null;
    }
  }

  Future<List<Activity>> getActivitiesForEvent(String eventId) async {
    final res = await _http.get('${Environment.eventManagementUrl}/event/$eventId/activity',
        headers: {'Authorization': 'Bearer ${_tokenService.accessToken}'})
        .then((r) => json.decode(r.body));
    return List.castFrom<dynamic, Activity>(res.map((a) => Activity.fromMap(a)).toList());
  }

  Future<Activity> addAttendeeToActivity(String attendeeId, String activityId) async {
    try {
      final headers = {'Authorization': 'Bearer ${_tokenService.accessToken}'};
      final response = await _http.put('${Environment.eventManagementUrl}/activity/$activityId/$attendeeId/add',
          headers: headers);
      final responseMap = json.decode(response.body);
      return Activity.fromMap(responseMap);
    }
    catch (e) {
      print('AttendeesService.addAttendeeToActivity(): $e');
      return null;
    }
  }

  Future<User> doRaffle(String activityId) async {
    final response = await _http.get('${Environment.eventManagementUrl}/activity/$activityId/raffle',
                                     headers: {'Authorization': 'Bearer ${_tokenService.accessToken}'});
    final responseMap = json.decode(response.body);
    return User.fromMap(responseMap);
  }

  Future<bool> setAttendeeAsPresent(String eventId, String attendeeId) async {
    try {
      final headers = {'Authorization': 'Bearer ${_tokenService.accessToken}'};
      final response = await _http.put('${Environment.eventManagementUrl}/event/$eventId/$attendeeId/present',
                                       headers: headers);
      return response.statusCode == 200;
    }
    catch (e) {
      print('AttendeesService.addAttendeeToActivity(): $e');
      return false;
    }
  }
}