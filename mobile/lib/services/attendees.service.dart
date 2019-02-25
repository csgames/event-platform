import 'dart:async';
import 'dart:convert';
import 'package:CSGamesApp/services/csgames.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';
import 'package:CSGamesApp/domain/attendee.dart';

class AttendeesService extends CSGamesApi {
  HttpClient _httpClient;

  AttendeesService(this._httpClient) : super('attendee');

    Future<Attendee> getAttendeeInfo() async {
        try {
            final response = await _httpClient.get(url('info'));
            var responseMap = json.decode(response.body);
            var attendee = Attendee.fromInfoMap(responseMap);
            return attendee;
        }
        catch (e) {
            print('AttendeesService.getAttendeeInfo(): $e');
            return null;
        }
    }

  Future<Attendee> getAttendeeByPublicId(String publicId) async {
    try {
      final response = await _httpClient.get(url('$publicId'));
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByPublicId(): $e');
      return null;
    }
  }

  Future<Attendee> getAttendeeByEmail(String email) async {
      try {
      final response = await _httpClient.get(url('$email'));
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByEmail(): $e');
      return null;
    }
  }

  Future<bool> updateAttendeePublicId(Attendee attendee) async {
    try {
      final response = await _httpClient.put(url('${attendee.id}/public-id/${attendee.publicId}'));
      return response.statusCode == 200;
    }
    catch (e) {
      print('AttendeesService.updateAttendeePublicId(): $e');
      return false;
    }
  }

  Future<bool> setFcmToken(String token) async {
    final body = {'token': token};
    final response = await _httpClient.put(url('token'), body: body, headers: {"With-Event": "false"});
    return response.statusCode == 200;
  }

  Future<bool> removeFcmToken(String token) async {
    final response = await _httpClient.delete(url('token/$token'), headers: {"With-Event": "false"});
    return response.statusCode == 200;
  }

    Future<bool> markNotificationAsSeen(String id) async {
        final headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };
        final body = json.encode({'notification': id, 'seen': true});

        final response = await _httpClient.put(
            url('notification'),
            body: body,
            headers: headers
        );
        return response.statusCode == 200;
    }
}