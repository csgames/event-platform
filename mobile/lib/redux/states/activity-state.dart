import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:meta/meta.dart';

@immutable
class ActivityState {
  final bool isLoading;
  final bool hasErrors;
  final bool isScanned;
  final Attendee attendee;
  final Activity activity;
  final Team team;
  final String errorTitle;
  final String errorContent;

  ActivityState({this.isLoading, this.hasErrors, this.isScanned, this.attendee, this.activity, this.errorTitle, this.errorContent, this.team});

  factory ActivityState.initial() => ActivityState(isLoading: false, hasErrors: false, isScanned: false, attendee: null, activity: null, errorTitle: '', errorContent: '', team: null);
  
  factory ActivityState.loading() => ActivityState(isLoading: true, hasErrors: false, isScanned: false, attendee: null, activity: null, errorTitle: '', errorContent: '', team: null);
}