import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/utils/environment.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';

class TokenService {
  final Client _http;
  String accessToken;
  String refreshToken;

  TokenService(this._http);

  Map getTokenPayload() {
      if (accessToken == null) {
        return null;
      }

      List<int> base64Bytes = BASE64.decode(accessToken.split('.')[1]);
      String payloadStr = UTF8.decode(base64Bytes);
      return JSON.decode(payloadStr);
  }

  void setup(String accessToken, String refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  Future<bool> validateTokens() async {
    if (accessToken == null) return false;
    var payload = getTokenPayload();
    num exp = payload["exp"];
    num now = new DateTime.now().millisecondsSinceEpoch / 1000;
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

  void clear() {
    accessToken = null;
    refreshToken = null;
  }

  Future<String> refreshAccessToken() async {
    String url = '${Environment.STS_URL}/connect/token';
    var body = new UrlEncodedParams()
      ..set('client_id', Environment.STS_CLIENT_ID)
      ..set('client_secret', Environment.STS_CLIENT_SECRET)
      ..set('scope', 'sts_api')
      ..set('grant_type', 'refresh_token')
      ..set('refresh_token', refreshToken);
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    try {
      var response = await _http.post(url, body: body.toString(), headers: headers);
      print(response.body);
      Map responseBody = JSON.decode(response.body);
      return responseBody['access_token'];
    }
    catch (e) {
      return null;
    }
  }
}