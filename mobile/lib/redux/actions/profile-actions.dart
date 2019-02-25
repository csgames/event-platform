import 'package:CSGamesApp/domain/team.dart';

class ScanAction {
  final Map<String, String> errorMessages;

  ScanAction(this.errorMessages);
}

class ErrorAction {
  final String title;
  final String description;

  ErrorAction(this.title, this.description);
}

class ScannedAction {}

class ResetProfileAction {}

class GetCurrentTeamAction {}

class SetCurrentTeamAction {
    final Team team;

  SetCurrentTeamAction(this.team);
}

class ResetTeamAction {}
