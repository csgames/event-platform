import 'dart:convert';

import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/services/event-management.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class ActivitiesService extends EventManagementService {
  HttpClient _httpClient;

  ActivitiesService(this._httpClient) : super('activity');

  Future<bool> addSubscriptionToActivity(String attendeeId, String activityId) async {
    try {
      final response = await _httpClient.put(this.get(path: '$activityId/$attendeeId/subscription'));
      return response.statusCode == 200;
    } catch(err) {
      print('AttendeesService.addSubscriptionToActivity(): $err');
      return false;
    }
  }

  Future<bool> verifyAttendeeSubscription(String attendeeId, String activityId) async {
    try {
      final response = await _httpClient.get(this.get(path: '$activityId/$attendeeId/subscription'));
      return response.statusCode == 200;
    } catch(err) {
      print('AttendeesService.addSubscriptionToActivity(): $err');
      return false;
    }
  }

  Future<Activity> addAttendeeToActivity(String attendeeId, String activityId) async {
    try {
      final response = await _httpClient.put(this.get(path: '$activityId/$attendeeId/add'));
      final responseMap = json.decode(response.body);
      return Activity.fromMap(responseMap);
    }
    catch (e) {
      print('AttendeesService.addAttendeeToActivity(): $e');
      return null;
    }
  }
}