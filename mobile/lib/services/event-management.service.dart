import 'package:CSGamesApp/utils/environment.dart';

class EventManagementService {
  String _resource;

  EventManagementService(this._resource);

  String get({ String path = "" }) {
    return "${Environment.eventManagementUrl}/$_resource/$path";
  }

  String getActivity({ String path = "" }) {
    return "${Environment.eventManagementUrl}/activity/$path";
  }

  String getAttendee({ String path = "" }) {
    return "${Environment.eventManagementUrl}/attendee/$path";
  }

  String getEvent({ String path = "" }) {
    return "${Environment.eventManagementUrl}/event/$path";
  }
}