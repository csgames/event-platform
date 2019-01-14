import 'dart:convert';

import 'package:CSGamesApp/services/token.service.dart';
import 'package:http/http.dart';

class HttpClient {
  Client _http;
  TokenService _tokenService;

  HttpClient(this._http, this._tokenService);

  Future<Response> get(url, { Map<String, String> headers }) async {
    headers = await this.setupHeaders(headers);
    return this._http.get(url, headers: headers);
  }

  Future<Response> post(url, { Map<String, String> headers, body, Encoding encoding }) async {
    headers = await this.setupHeaders(headers);
    return this._http.post(url, headers: headers, body: body, encoding: encoding);
  }

  Future<Response> put(url, { Map<String, String> headers, body, Encoding encoding }) async {
    headers = await this.setupHeaders(headers);
    return this._http.put(url, headers: headers, body: body, encoding: encoding);
  }

  Future<Response> patch(url, { Map<String, String> headers, body, Encoding encoding }) async {
    headers = await this.setupHeaders(headers);
    return this._http.patch(url, headers: headers, body: body, encoding: encoding);
  }

  Future<Response> delete(url, { Map<String, String> headers }) async {
    headers = await this.setupHeaders(headers);
    return this._http.delete(url, headers: headers);
  }

  Future<Map<String, String>> setupHeaders( Map<String, String> headers) async {
    if (!await this._tokenService.validateTokens()) {
      print("No valid token");
    }

    var token = this._tokenService.accessToken;
    if (headers != null) {
      headers.putIfAbsent("Authorization", () => "Bearer $token");
    } else {
      headers = {"Authorization": "Bearer $token"};
    }

    return headers;
  }
}