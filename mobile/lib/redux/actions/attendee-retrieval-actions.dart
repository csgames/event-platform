import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/domain/user.dart';

class InitAction {}

class NfcScannedAction {
  final String nfcId;
  final Attendee attendee;
  final User user;

  NfcScannedAction(this.nfcId, this.attendee, this.user);
}

class NfcAssignedAction {
  final bool idSaved;
  final bool statusSaved;
  final Attendee attendee;
  final User user;

  NfcAssignedAction(this.idSaved, this.statusSaved, this.attendee, this.user);
}

class NfcAlreadyAssignedAction {
  final Attendee attendee;
  final User user;

  NfcAlreadyAssignedAction(this.attendee, this.user);
}

class SearchAction {
  final String username;
  final Event event;
  final Map<String, String> errorMessages;

  SearchAction(this.username, this.event, this.errorMessages);
}

class ScanAction {
  final Event event;
  final Map<String, String> errorMessages;

  ScanAction(this.event, this.errorMessages);
}

class ErrorAction {
  final String title;
  final String description;

  ErrorAction(this.title, this.description);
}

class SearchCompletedAction {
  final Attendee attendee;
  final User user;

  SearchCompletedAction(this.attendee, this.user);
}

class ClearAttendeeAction {}

class ResetAttendeeAction {}

class CleanAction {
  final Attendee attendee;
  final User user;

  CleanAction(this.attendee, this.user);
}

class GetCurrentAttendeeAction {
  final String userId;

  GetCurrentAttendeeAction(this.userId);
}

class SetCurrentAttendeeAction {
  final Attendee attendee;

  SetCurrentAttendeeAction(this.attendee);
}