import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/redux/states/activities-subscription-state.dart';
import 'package:PolyHxApp/redux/states/activity-state.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:PolyHxApp/redux/states/login-state.dart';
import 'package:PolyHxApp/redux/states/notification-state.dart';
import 'package:PolyHxApp/redux/states/profile-state.dart';
import 'package:PolyHxApp/redux/states/sponsors-state.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  final User currentUser;
  final Event currentEvent;
  final EventState eventState;
  final LoginState loginState;
  final Attendee currentAttendee;
  final ProfileState profileState;
  final SponsorsState sponsorsState;
  final ActivityState activityState;
  final NotificationState notificationState;
  final AttendeeRetrievalState attendeeRetrievalState;
  final ActivitiesScheduleState activitiesScheduleState;
  final ActivitiesSubscriptionState activitiesSubscriptionState;

  AppState({
    this.eventState,
    this.loginState,
    this.currentUser,
    this.profileState,
    this.currentEvent,
    this.sponsorsState,
    this.activityState,
    this.currentAttendee,
    this.notificationState,
    this.attendeeRetrievalState,
    this.activitiesScheduleState,
    this.activitiesSubscriptionState
  });
}