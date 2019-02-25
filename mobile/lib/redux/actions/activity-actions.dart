import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/attendee.dart';

class ResetActivity {}

class PopAction {}

class InitAction {
  final String activityId;
  final Map<String, String> errorMessages;

  InitAction(this.activityId, this.errorMessages);
}

class ScanError {
  final String title;
  final String content;

  ScanError(this.title, this.content);
}

class AttendeeScanned {
  final Activity activity;
  final Attendee attendee;

  AttendeeScanned(this.activity, this.attendee);
}

class GetCurrentActivity {
    final String activityId;

    GetCurrentActivity(this.activityId);
}

class SetCurrentActivity {
    final Activity activity;

    SetCurrentActivity(this.activity);
}
