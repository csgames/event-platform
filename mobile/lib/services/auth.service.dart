import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/environment.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';

class AuthService {
  final Client _http;
  final TokenService _tokenService;

  User _currentUser;
  User get CurrentUser => _currentUser;

  bool loggedIn;

  AuthService(this._http, this._tokenService) {
    checkLoggedIn();
    if (_tokenService.TokenPayload != null) {
      updateCurrentUser();
    }
  }

  void updateCurrentUser() {
    var payload = _tokenService.TokenPayload;
    this._currentUser = new User()
      ..id = payload["user_id"]
      ..permissions = JSON.decode(payload["permissions"])
      ..firstName = payload["firstname"]
      ..lastName = payload["lastname"]
      ..role = payload["role"]
      ..username = payload["name"]
      ..email = payload["name"]
      ..birthDate = payload["birthDate"];
  }

  Future checkLoggedIn() async {
    loggedIn = await _tokenService.validateTokens();
  }

  Future<bool> login(String email, String password) async {
    String url = '${Environment.STS_URL}/connect/token';
    var body = new UrlEncodedParams()
      ..set('client_id', Environment.STS_CLIENT_ID)
      ..set('client_secret', Environment.STS_CLIENT_SECRET)
      ..set('scope', 'sts_api+offline_access')
      ..set('grant_type', 'password')
      ..set('username', email)
      ..set('password', password);
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    try {
      var response = await _http.post(url, body: body.toString(), headers: headers);
      Map responseBody = JSON.decode(response.body);
      _tokenService.setup(responseBody['access_token'], responseBody['refresh_token']);
      await _tokenService.validateTokens();
      if (_tokenService.TokenPayload != null) {
        updateCurrentUser();
      }
      return true;
    }
    catch (e) {
      print(e);
      return false;
    }
  }

  void logout() {
    _tokenService.clear();
  }
}