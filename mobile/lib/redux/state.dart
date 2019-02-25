import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/redux/states/activities-schedule-state.dart';
import 'package:CSGamesApp/redux/states/activities-subscription-state.dart';
import 'package:CSGamesApp/redux/states/activity-state.dart';
import 'package:CSGamesApp/redux/states/attendee-retrieval-state.dart';
import 'package:CSGamesApp/redux/states/event-state.dart';
import 'package:CSGamesApp/redux/states/guide-state.dart';
import 'package:CSGamesApp/redux/states/login-state.dart';
import 'package:CSGamesApp/redux/states/notification-state.dart';
import 'package:CSGamesApp/redux/states/profile-state.dart';
import 'package:CSGamesApp/redux/states/puzzle-hero-state.dart';
import 'package:CSGamesApp/redux/states/puzzle-state.dart';
import 'package:CSGamesApp/redux/states/sponsors-state.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  final Team currentTeam;
  final Event currentEvent;
  final GuideState guideState;
  final EventState eventState;
  final LoginState loginState;
  final Attendee currentAttendee;
  final Activity currentActivity;
  final PuzzlesState puzzlesState;
  final ProfileState profileState;
  final SponsorsState sponsorsState;
  final ActivityState activityState;
  final PuzzleHeroState puzzleHeroState;
  final NotificationState notificationState;
  final AttendeeRetrievalState attendeeRetrievalState;
  final ActivitiesScheduleState activitiesScheduleState;
  final ActivitiesSubscriptionState activitiesSubscriptionState;

  AppState({
    this.guideState,
    this.loginState,
    this.eventState,
    this.currentTeam,
    this.profileState,
    this.currentEvent,
    this.puzzlesState,
    this.sponsorsState,
    this.activityState,
    this.currentActivity,
    this.currentAttendee,
    this.puzzleHeroState,
    this.notificationState,
    this.attendeeRetrievalState,
    this.activitiesScheduleState,
    this.activitiesSubscriptionState
  });
}