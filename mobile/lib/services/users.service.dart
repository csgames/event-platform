import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils//environment.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';

class UsersService {
  final Client _http;
  final TokenService _tokenService;

  UsersService(this._http, this._tokenService) {}

  Future<num> getUsersCount() async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.AccessToken}"};
      final response = await _http.get("${Environment.STS_URL}/user/count", headers: headers);
      final responseMap = JSON.decode(response.body);
      return responseMap["count"];
    }
    catch (e) {
      print('UsersService.getUsersCount(): $e');
      return null;
    }
  }

  Future<List<User>> getAllUsers() async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.AccessToken}"};
      final response = await _http.get("${Environment.STS_URL}/user", headers: headers);
      final responseMap = JSON.decode(response.body);
      List<User> users = [];
      responseMap["users"].forEach((userMap) => users.add(new User.fromMap(userMap)));
      return users;
    }
    catch (e) {
      print('UsersService.getAllUsers(): $e');
      return null;
    }
  }

  Future<User> getUser(String id) async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.AccessToken}"};
      final response = await _http.get("${Environment.STS_URL}/user/$id", headers: headers);
      var responseMap = JSON.decode(response.body);
      var user = new User.fromMap(responseMap["user"]);
      return user;
    }
    catch (e) {
      print('UsersService.getUser(): $e');
      return null;
    }
  }

  Future<User> getUserByUsername(String username) async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.AccessToken}"};
      final response = await _http.get("${Environment.STS_URL}/user/username/$username", headers: headers);
      final responseMap = JSON.decode(response.body);
      var user = new User.fromMap(responseMap["user"]);
      return user;
    }
    catch (e) {
      print('UsersService.getUserByUsername(): $e');
      return null;
    }
  }

  Future<bool> updateUser(User user) async {
    try {
      var body = new UrlEncodedParams()
        ..set('id', user.id)
        ..set('username', user.username)
        ..set('password', user.password)
        ..set('email', user.email)
        ..set('lastName', user.lastName)
        ..set('birthDate', user.birthDate)
        ..set('isActive', user.isActive?.toString() ?? "true")
        ..set('validated', user.validated?.toString() ?? "false")
        ..set('roleId', user.roleId)
        ..set('firstName', user.firstName);

      final headers = {
        "Authorization": "Bearer ${_tokenService.AccessToken}",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      final response = await _http.put("${Environment.STS_URL}/user/admin/${user.id}",
               body: body.toString(), headers: headers
      );
      final responseMap = JSON.decode(response.body);
      return true;
    }
    catch (e) {
      print('UsersService.updateUser(): $e');
      return false;
    }
  }

  Future<bool> createUser(User user) async {
    try {
      var body = new UrlEncodedParams()
        ..set('username', user.username)
        ..set('password', user.password)
        ..set('email', user.email)
        ..set('firstName', user.firstName)
        ..set('lastName', user.lastName)
        ..set('birthDate', user.birthDate)
        ..set('isActive', user.isActive?.toString() ?? "true")
        ..set('validated', user.validated?.toString() ?? "false")
        ..set('roleId', user.roleId);

      final headers = {
        "Authorization": "Bearer ${_tokenService.AccessToken}",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      final response = await _http.post("${Environment.STS_URL}/user",
          body: body.toString(), headers: headers
      );
      final responseMap =  JSON.decode(response.body);
      return true;
    }
    catch (e) {
      print('UsersService.createUser(): $e');
      return false;
    }
  }
}
