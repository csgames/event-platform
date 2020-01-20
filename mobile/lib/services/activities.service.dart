import 'dart:convert';

import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/services/csgames.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class ActivitiesService extends CSGamesApi {
  HttpClient _httpClient;

  ActivitiesService(this._httpClient) : super('activity');

  Future<Activity> getActivity(String activityId) async {
      final response = await this._httpClient.get(url(activityId));
      final responseMap = json.decode(response.body);
      return Activity.fromMap(responseMap);
  }

  Future<bool> addSubscriptionToActivity(
      String attendeeId, String activityId) async {
    try {
      final response =
          await _httpClient.put(url('$activityId/$attendeeId/subscription'));
      return response.statusCode == 200;
    } catch (err) {
      print('AttendeesService.addSubscriptionToActivity(): $err');
      return false;
    }
  }

  Future<bool> verifyAttendeeSubscription(
      String attendeeId, String activityId) async {
    try {
      final response =
          await _httpClient.get(url('$activityId/$attendeeId/subscription'));
      return response.statusCode == 200;
    } catch (err) {
      print('AttendeesService.addSubscriptionToActivity(): $err');
      return false;
    }
  }

  Future<Activity> addAttendeeToActivity(
      String attendeeId, String activityId) async {
    try {
      final response = await _httpClient.put(url('$activityId/$attendeeId'));
      final responseMap = json.decode(response.body);
      return Activity.fromMap(responseMap);
    } catch (e) {
      print('AttendeesService.addAttendeeToActivity(): $e');
      return null;
    }
  }

  Future<bool> sendPushToActivity(String activityId, String title, String content) async {
    final body = {'title': title, 'body': content};
    final response =
        await _httpClient.post(url('$activityId/notification'), body: body);
    return response.statusCode == 201;
  }
}
