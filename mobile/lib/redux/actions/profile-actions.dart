import 'dart:async';

import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/domain/user.dart';

class SetCurrentUserAction {
  final User user;

  SetCurrentUserAction(this.user);
}

class GetCurrentUserAction {
  final Completer completer;
  
  GetCurrentUserAction({Completer completer})
    : this.completer = completer ?? Completer();
}

class ScanAction {
  final String attendeeId;
  final Event event;
  final Map<String, String> errorMessages;

  ScanAction(this.attendeeId, this.event, this.errorMessages);
}

class ErrorAction {
  final String title;
  final String description;

  ErrorAction(this.title, this.description);
}

class ScannedAction {}

class ResetProfileAction {}