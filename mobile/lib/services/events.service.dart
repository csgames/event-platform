import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/environment.dart';

class EventsService {
  Client _http;
  TokenService _tokenService;

  List<Event> _eventsCache;

  EventsService(this._http, this._tokenService);

  Future<List<Event>> getAllEvents() async {
    try {
      final response = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/event",
          headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"});
      final responseMap = JSON.decode(response.body);
      _eventsCache = responseMap.map((e) => new Event.fromMap(e)).toList();
      return _eventsCache;
    }
    catch (e) {
      print(e);
      return null;
    }
  }

  Future<Event> getEventById(String id) async {
    try {
      final response = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/event/$id",
          headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"});
      final responseMap = JSON.decode(response.body);
      return new Event.fromMap(responseMap['event']);
    }
    catch (e) {
      print(e);
      return null;
    }
  }

  Future<List<Activity>> getAllActivities() async {
    final res = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/activity",
        headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"})
        .then((r) => JSON.decode(r.body));
    return res.map((a) => new Activity.fromMap(a)).toList();
  }
}