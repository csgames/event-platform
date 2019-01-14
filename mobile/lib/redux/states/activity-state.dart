import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/user.dart';
import 'package:meta/meta.dart';

@immutable
class ActivityState {
  final bool isLoading;
  final bool hasErrors;
  final bool isScanned;
  final User winner;
  final User user;
  final Activity activity;
  final String errorTitle;
  final String errorContent;

  ActivityState({this.isLoading, this.hasErrors, this.isScanned, this.winner, this.user, this.activity, this.errorTitle, this.errorContent});

  factory ActivityState.initial() => ActivityState(isLoading: false, hasErrors: false, isScanned: false, winner: null, user: null, activity: null, errorTitle: '', errorContent: '');
  
  factory ActivityState.loading() => ActivityState(isLoading: true, hasErrors: false, isScanned: false, winner: null, user: null, activity: null, errorTitle: '', errorContent: '');
}