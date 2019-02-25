import 'dart:convert';

import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HttpClient {
  Client _http;
  SharedPreferences _prefs;
  String _eventId = "";

  HttpClient(this._http) {
      init();
  }

  Future init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  set eventId(String eventId) {
      _eventId = eventId;
  }

  String get cookie {
      return _prefs?.getString('cookie');
  }

  set cookie(String cookie) {
      if (cookie == null) {
          _prefs?.remove('cookie');
      } else {
          _prefs?.setString('cookie', cookie);
      }
  }

  Future<Response> get(url, { Map<String, String> headers }) async {
    var h = setupHeaders(headers);
    Response response = await this._http.get(url, headers: h);
    updateCookie(response);
    return response;
  }

  Future<Response> post(url, { Map<String, String> headers, body, Encoding encoding }) async {
    var h = setupHeaders(headers);
    Response response = await this._http.post(url, headers: h, body: body, encoding: encoding);
    updateCookie(response);
    return response;
  }

  Future<Response> put(url, { Map<String, String> headers, body, Encoding encoding }) async {
    var h = setupHeaders(headers);
    Response response = await this._http.put(url, headers: h, body: body, encoding: encoding);
    updateCookie(response);
    return response;
  }

  Future<Response> patch(url, { Map<String, String> headers, body, Encoding encoding }) async {
    var h = setupHeaders(headers);
    Response response = await this._http.patch(url, headers: h, body: body, encoding: encoding);
    updateCookie(response);
    return response;
  }

  Future<Response> delete(url, { Map<String, String> headers }) async {
    var h = setupHeaders(headers);
    Response response = await this._http.delete(url, headers: h);
    updateCookie(response);
    return response;
  }

  void updateCookie(Response response) {
    String rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      cookie = (index == -1) ? rawCookie : rawCookie.substring(0, index);
    }
  }

  Map<String, String> setupHeaders(Map<String, String> headers) {
      Map<String, String> h = {};

      h.addAll({'cookie': cookie});

      if (headers != null) h.addAll(headers);

      if (h["With-Event"] == "false") {
          h.removeWhere((key, value) => key == "With-Event");
          return h;
      } else if (_eventId == "") {
          return h;
      } else {
          h.addAll({"Event-Id": _eventId});
      }
      return h;
  }
}