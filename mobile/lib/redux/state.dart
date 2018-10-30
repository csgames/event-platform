import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/redux/states/activity-state.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:PolyHxApp/redux/states/login-state.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  final EventState eventState;
  final Event currentEvent;
  final LoginState loginState;
  final ActivitiesScheduleState activitiesScheduleState;
  final ActivityState activityState;
  final AttendeeRetrievalState attendeeRetrievalState;

  AppState({
    this.eventState,
    this.currentEvent,
    this.loginState,
    this.activitiesScheduleState,
    this.activityState,
    this.attendeeRetrievalState
  });
}