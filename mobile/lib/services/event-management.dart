import 'dart:async';
import 'dart:convert';

import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/environment.dart';
import 'package:http/http.dart';


class EventManagementService {
  Client _http;
  TokenService _tokenService;

  List<Event> _eventsCache;

  EventManagementService(this._http, this._tokenService) {

  }

  Future<List<Event>> getAllEvents() async {
    final res = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/event",
        headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"})
        .then((r) => JSON.decode(r.body));

    _eventsCache = res.map((e) => new Event.fromMap(e)).toList();
    return _eventsCache;
  }

  Future<Event> getEventById(String id) async {
    final res = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/event/$id",
        headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"})
        .then((r) => JSON.decode(r.body));
    return new Event.fromMap(res['event']);
  }

  Future<List<Activity>> getAllActivities() async {
    final res = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/activity",
        headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"})
        .then((r) => JSON.decode(r.body));
    return res.map((a) => new Activity.fromMap(a)).toList();
  }

}