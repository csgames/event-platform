import 'dart:async';
import 'dart:convert';

import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/environment.dart';
import 'package:http/http.dart';


class EventManagementService {
  Client _http;
  TokenService _tokenService;

  EventManagementService(this._http, this._tokenService) {

  }

  Future<List<Event>> getAllEvents() async {
    final res = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/event",
        headers: {"Authorization": "Bearer ${_tokenService.AccessToken}"})
        .then((r) => JSON.decode(r.body));

    return res.map((e) => new Event.fromMap(e));
  }
}