import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';

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

  SearchAction(this.username, this.event);
}

class ScanAction {
  final Event event;

  ScanAction(this.event);
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

class ResetAction {}

class CleanAction {
  final Attendee attendee;
  final User user;

  CleanAction(this.attendee, this.user);
}