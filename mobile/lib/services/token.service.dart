import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/utils/environment.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';
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

  void set AccessToken(String accessToken) {
    if (accessToken == null) {
      _prefs?.remove('access_token');
    } else {
      _prefs?.setString('access_token', accessToken);
    }
  }

  String get AccessToken {
    return _prefs?.getString('access_token');
  }

  void set RefreshToken(String refreshToken) {
    if (refreshToken == null) {
      _prefs?.remove('refresh_token');
    } else {
      _prefs?.setString('refresh_token', refreshToken);
    }
  }

  String get RefreshToken {
    return _prefs?.getString('refresh_token');
  }

  Map get TokenPayload {
    var accessToken = AccessToken;
    if (accessToken == null) {
      return null;
    }

    String payload = accessToken.split('.')[1];
    int padding = payload.length % 4;

    for (int i = 0; i < padding; ++i) {
      payload += '=';
    }

    List<int> base64Bytes = BASE64.decode(payload);
    String payloadStr = UTF8.decode(base64Bytes);
    return JSON.decode(payloadStr);
  }

  void setup(String accessToken, String refreshToken) {
    AccessToken = accessToken;
    RefreshToken = refreshToken;
  }

  Future<bool> validateTokens() async {
    await init();
    if (AccessToken == null) return false;
    var payload = TokenPayload;
    num exp = payload["exp"];
    num now = new DateTime.now().millisecondsSinceEpoch / 1000;
    if (now >= exp) {
      if (RefreshToken == null) return false;
      String newToken = await refreshAccessToken();
      if (newToken != null) {
        AccessToken = newToken;
      }
      return newToken != null;
    }
    return true;
  }

  void clear() {
    AccessToken = null;
    RefreshToken = null;
  }

  Future<String> refreshAccessToken() async {
    String url = '${Environment.STS_URL}/connect/token';
    var body = new UrlEncodedParams()
      ..set('client_id', Environment.STS_CLIENT_ID)
      ..set('client_secret', Environment.STS_CLIENT_SECRET)
      ..set('scope', 'sts_api')
      ..set('grant_type', 'refresh_token')
      ..set('refresh_token', RefreshToken);
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    try {
      var response =
          await _http.post(url, body: body.toString(), headers: headers);
      Map responseBody = JSON.decode(response.body);
      return responseBody['access_token'];
    } catch (e) {
      return null;
    }
  }
}
