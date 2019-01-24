import 'dart:async';
import 'dart:convert';
import 'package:CSGamesApp/services/event-management.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';
import 'package:CSGamesApp/domain/attendee.dart';

class AttendeesService extends EventManagementService {
  HttpClient _httpClient;

  AttendeesService(this._httpClient) : super('attendee');

  Future<Attendee> getAttendeeByUserId(String userId) async {
    try {
      final response = await _httpClient.get(this.get(path: 'user/$userId'));
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap["attendee"]);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByUserId(): $e');
      return null;
    }
  }

    Future<Attendee> getAttendeeInfo() async {
        try {
            final response = await _httpClient.get(this.get(path: 'info'));
            var responseMap = json.decode(response.body);
            var attendee = Attendee.fromInfoMap(responseMap["attendee"]);
            return attendee;
        }
        catch (e) {
            print('AttendeesService.getAttendeeInfo(): $e');
            return null;
        }
    }

  Future<Attendee> getAttendeeByPublicId(String publicId) async {
    try {
      final response = await _httpClient.get(this.get(path: '$publicId'));
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap["attendee"]);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByPublicId(): $e');
      return null;
    }
  }

  Future<bool> updateAttendeePublicId(Attendee attendee) async {
    try {
      final response = await _httpClient.put(this.get(path: '${attendee.id}/public_id/${attendee.publicId}'));
      return response.statusCode == 200;
    }
    catch (e) {
      print('AttendeesService.updateAttendeePublicId(): $e');
      return false;
    }
  }

  Future<bool> setFcmToken(String token) async {
    final body = {'token': token};
    final response = await _httpClient.put(this.get(path: 'token'), body: body);
    return response.statusCode == 200;
  }

  Future<bool> removeFcmToken(String token) async {
    final response = await _httpClient.delete(this.get(path: 'token/$token'));
    return response.statusCode == 200;
  }
}