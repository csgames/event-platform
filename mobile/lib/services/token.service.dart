import 'dart:async';
import 'dart:convert';
import 'package:CSGamesApp/domain/user.dart';
import 'package:http/http.dart';
import 'package:CSGamesApp/utils/environment.dart';
import 'package:CSGamesApp/utils/url-encoded-params.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TokenService {
  SharedPreferences _prefs;
  final Client _http;

  TokenService(this._http) {
    init();
  }

  Future init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  set accessToken(String accessToken) {
    if (accessToken == null) {
      _prefs?.remove('access_token');
    } else {
      _prefs?.setString('access_token', accessToken);
    }
  }

  String get accessToken {
    return _prefs?.getString('access_token');
  }

  set refreshToken(String refreshToken) {
    if (refreshToken == null) {
      _prefs?.remove('refresh_token');
    } else {
      _prefs?.setString('refresh_token', refreshToken);
    }
  }

  String get refreshToken {
    return _prefs?.getString('refresh_token');
  }

  Map get tokenPayload {
    var token = accessToken;
    if (token == null) {
      return null;
    }

    String payload = token.split('.')[1];
    int padding = payload.length % 4;

    if (padding == 1 || padding == 3) {
      payload += '=';
    }
    else if (padding == 2) {
      payload += '==';
    }

    List<int> base64Bytes = base64.decode(payload);
    String payloadStr = utf8.decode(base64Bytes);
    return json.decode(payloadStr);
  }

  void setup(String __accessToken, String __refreshToken) {
    accessToken = __accessToken;
    refreshToken = __refreshToken;
  }

  Future<bool> validateTokens() async {
    await init();
    if (accessToken == null) return false;
    var payload = tokenPayload;
    num exp = payload["exp"];
    num now = DateTime.now().millisecondsSinceEpoch / 1000;
    if (now >= exp) {
      if (refreshToken == null) return false;
      String newToken = await refreshAccessToken();
      if (newToken != null) {
        accessToken = newToken;
      }
      return newToken != null;
    }
    return true;
  }

  User getCurrentUser() {
    if (tokenPayload == null) return null;
    return User.fromToken(tokenPayload);
  }

  void clear() {
    accessToken = null;
    refreshToken = null;
  }

  Future<String> refreshAccessToken() async {
    String url = '${Environment.stsUrl}/connect/token';
    var body = UrlEncodedParams()
      ..set('client_id', Environment.stsClientId)
      ..set('client_secret', Environment.stsClientSecret)
      ..set('scope', 'sts_api')
      ..set('grant_type', 'refresh_token')
      ..set('refresh_token', refreshToken);
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    try {
      var response =
          await _http.post(url, body: body.toString(), headers: headers);
      Map responseBody = json.decode(response.body);
      return responseBody['access_token'];
    } catch (e) {
      return null;
    }
  }
}
