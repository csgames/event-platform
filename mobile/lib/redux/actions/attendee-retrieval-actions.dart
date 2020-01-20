import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';

class InitAction {}

class NfcScannedAction {
  final String nfcId;
  final Attendee attendee;

  NfcScannedAction(this.nfcId, this.attendee);
}

class NfcAssignedAction {
  final bool idSaved;
  final Attendee attendee;

  NfcAssignedAction(this.idSaved, this.attendee);
}

class NfcAlreadyAssignedAction {
  final Attendee attendee;

  NfcAlreadyAssignedAction(this.attendee);
}

class SearchAction {
  final String username;
  final Map<String, String> errorMessages;

  SearchAction(this.username, this.errorMessages);
}

class ScanAction {
  final Map<String, String> errorMessages;

  ScanAction(this.errorMessages);
}

class ErrorAction {
  final String title;
  final String description;

  ErrorAction(this.title, this.description);
}

class SearchCompletedAction {
  final Attendee attendee;
  final Team team;

  SearchCompletedAction(this.attendee, this.team);
}

class ClearAttendeeAction {}

class ResetAttendeeAction {}

class ResetCurrentAttendeeAction {}

class CleanAction {
  final Attendee attendee;

  CleanAction(this.attendee);
}

class GetCurrentAttendeeAction {
  final Completer completer;

  GetCurrentAttendeeAction({Completer completer})
    : this.completer = completer ?? Completer();
}

class SetCurrentAttendeeAction {
  final Attendee attendee;

  SetCurrentAttendeeAction(this.attendee);
}

class UnsubscribeAction {}
