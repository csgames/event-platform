import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils//environment.dart';

class AttendeesService {
  static final Map<Degree, String> _degrees = {
    Degree.Cegep: 'cegep',
    Degree.Bachelor: 'bachelor',
    Degree.Master: 'master',
    Degree.PhD: 'phd',
  };

  static final Map<Gender, String> _genders = {
    Gender.Male: 'male',
    Gender.Female: 'female',
    Gender.Other: 'other',
    Gender.NoAnswer: 'no_answer',
  };


  static final Map<ShirtSize, String> _shirtSizes = {
    ShirtSize.Small: 'small',
    ShirtSize.Medium: 'medium',
    ShirtSize.Large: 'large',
    ShirtSize.XLarge: 'x-large',
    ShirtSize.XXLarge: '2x-large',
  };

  final Client _http;
  final TokenService _tokenService;

  AttendeesService(this._http, this._tokenService);

  Future<Attendee> getAttendeeByUserId(String userId) async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.accessToken}"};
      final response = await _http.get("${Environment.eventManagementUrl}/attendee/user/$userId", headers: headers);
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap["attendee"]);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByUserId(): $e');
      return null;
    }
  }

  Future<Attendee> getAttendeeByPublicId(String publicId) async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.accessToken}"};
      final response = await _http.get("${Environment.eventManagementUrl}/attendee/$publicId", headers: headers);
      var responseMap = json.decode(response.body);
      var attendee = Attendee.fromMap(responseMap["attendee"]);
      return attendee;
    }
    catch (e) {
      print(e);
      return null;
    }
  }

  Future<bool> updateAttendeePublicId(Attendee attendee) async {
    try {
      final headers = {"Authorization": "Bearer ${_tokenService.accessToken}"};
      final response = await _http.put(
          "${Environment.eventManagementUrl}/attendee/${attendee
              .id}/public_id/${attendee.publicId}", headers: headers);
      return response.statusCode == 200;
    }
    catch (e) {
      print('AttendeesService.updateAttendeePublicId(): $e');
      return false;
    }
  }
}