import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils//environment.dart';
import 'package:PolyHxApp/utils/url-encoded-params.dart';

class AttendeesService {
  static final Map<Degree, String> _DEGREES = {
    Degree.Cegep: 'cegep',
    Degree.Bachelor: 'bachelor',
    Degree.Master: 'master',
    Degree.PhD: 'phd',
  };

  static final Map<Gender, String> _GENDERS = {
    Gender.Male: 'male',
    Gender.Female: 'female',
    Gender.Other: 'other',
    Gender.NoAnswer: 'no_answer',
  };


  static final Map<ShirtSize, String> _SHIRT_SIZES = {
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
      final headers = {"Authorization": "Bearer ${_tokenService.AccessToken}"};
      final response = await _http.get("${Environment.EVENT_MANAGEMENT_URL}/attendee/user/$userId", headers: headers);
      var responseMap = JSON.decode(response.body);
      var attendee = new Attendee.fromMap(responseMap["attendee"]);
      return attendee;
    }
    catch (e) {
      print('AttendeesService.getAttendeeByUserId(): $e');
      return null;
    }
  }
}