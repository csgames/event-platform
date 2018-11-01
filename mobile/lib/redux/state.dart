import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/redux/states/activity-state.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:PolyHxApp/redux/states/login-state.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  final Event currentEvent;
  final EventState eventState;
  final LoginState loginState;
  final ActivityState activityState;
  final AttendeeRetrievalState attendeeRetrievalState;
  final ActivitiesScheduleState activitiesScheduleState;

  AppState({
    this.eventState,
    this.loginState,
    this.currentEvent,
    this.activityState,
    this.attendeeRetrievalState,
    this.activitiesScheduleState
  });
}