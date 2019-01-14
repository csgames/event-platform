import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/user.dart';

class RaffleAction {
  final String activityId;

  RaffleAction(this.activityId);
}

class WinnerSelected {
  final User winner;

  WinnerSelected(this.winner);
}

class RaffleError {}

class ResetActivity {}

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
  final User user;

  AttendeeScanned(this.activity, this.user);
}