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
  User get currentUser => _currentUser;

  bool loggedIn;

  AuthService(this._http, this._tokenService) {
    checkLoggedIn();
    if (_tokenService.tokenPayload != null) {
      updateCurrentUser();
    }
  }

  void updateCurrentUser() {
    var payload = _tokenService.tokenPayload;
    this._currentUser = User()
      ..id = payload["user_id"]
      ..permissions = List.castFrom<dynamic, String>(json.decode(payload["permissions"]))
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

  Future<void> login(String email, String password) async {
    String url = '${Environment.stsUrl}/connect/token';
    var body = UrlEncodedParams()
      ..set('client_id', Environment.stsClientId)
      ..set('client_secret', Environment.stsClientSecret)
      ..set('scope', 'sts_api+offline_access')
      ..set('grant_type', 'password')
      ..set('username', email)
      ..set('password', password);
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    var response = await _http.post(url, body: body.toString(), headers: headers);
    Map responseBody = json.decode(response.body);
    _tokenService.setup(responseBody['access_token'], responseBody['refresh_token']);
    if (!await _tokenService.validateTokens()) throw('Unauthenticated');
    if (_tokenService.tokenPayload != null) {
      updateCurrentUser();
    }
  }

  void logout() {
    _tokenService.clear();
  }
}