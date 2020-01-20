import 'dart:async';
import 'dart:convert';
import 'package:CSGamesApp/services/gateway.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class AuthService extends GatewayApi {
  final HttpClient _http;

  AuthService(this._http);

  Future<bool> checkLoggedIn() async {
    var headers = {"With-Event": "false"};
    var response = await _http.get(url("isloggedin"), headers: headers);
    var body = json.decode(response.body);
    return body["logged_in"];
  }

  Future<void> login(String email, String password, {remember: "true"}) async {
    var body = {"email": email, "password": password, "remember": remember};
    var headers = {"With-Event": "false"};
    var response = await _http.post(url("login"), body: body, headers: headers);
    if (response.statusCode != 200) throw 'Unauthenticated';
  }

    Future<void> logout() async {
        var headers = {"With-Event": "false"};
        await _http.get(url("logout"), headers: headers);
    }
}