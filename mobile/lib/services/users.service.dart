import 'dart:async';
import 'dart:convert';
import 'package:PolyHxApp/services/sts.service.dart';
import 'package:PolyHxApp/utils/http-client.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';

class UsersService extends StsService {
  final HttpClient _httpClient;

  UsersService(this._httpClient) : super('user');

  Future<num> getUsersCount() async {
    try {
      final response = await _httpClient.get(this.get(path: 'user/count'));
      final responseMap = json.decode(response.body);
      return responseMap["count"];
    }
    catch (e) {
      print('UsersService.getUsersCount(): $e');
      return null;
    }
  }

  Future<List<User>> getAllUsers() async {
    try {
      final response = await _httpClient.get(this.get(path: 'user'));
      final responseMap = json.decode(response.body);
      List<User> users = [];
      responseMap["users"].forEach((userMap) => users.add(User.fromMap(userMap)));
      return users;
    }
    catch (e) {
      print('UsersService.getAllUsers(): $e');
      return null;
    }
  }

  Future<User> getUser(String id) async {
    try {
      final response = await _httpClient.get(this.get(path: '$id'));
      var responseMap = json.decode(response.body);
      var user = User.fromMap(responseMap["user"]);
      return user;
    }
    catch (e) {
      print('UsersService.getUser(): $e');
      return null;
    }
  }

  Future<User> getUserByUsername(String username) async {
    try {
      username = username.toLowerCase();
      final response = await _httpClient.get(this.get(path: 'username/$username'));
      final responseMap = json.decode(response.body);
      var user = User.fromMap(responseMap["user"]);
      return user;
    }
    catch (e) {
      print('UsersService.getUserByUsername(): $e');
      return null;
    }
  }

  Future<bool> updateUser(User user) async {
    try {
      var body = UrlEncodedParams()
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
        "Content-Type": "application/x-www-form-urlencoded"
      };
      final response = await _httpClient.put(this.get(path: 'admin/${user.id}'),
               body: body.toString(), headers: headers
      );
      final responseMap = json.decode(response.body);
      return true;
    }
    catch (e) {
      print('UsersService.updateUser(): $e');
      return false;
    }
  }

  Future<bool> createUser(User user) async {
    try {
      var body = UrlEncodedParams()
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
        "Content-Type": "application/x-www-form-urlencoded"
      };
      final response = await _httpClient.post(this.get(path: 'user'),
          body: body.toString(), headers: headers
      );
      final responseMap =  json.decode(response.body);
      return true;
    }
    catch (e) {
      print('UsersService.createUser(): $e');
      return false;
    }
  }
}
