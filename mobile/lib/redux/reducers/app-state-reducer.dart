import 'package:PolyHxApp/redux/reducers/activities-schedule-reducer.dart';
import 'package:PolyHxApp/redux/reducers/activity-reducer.dart';
import 'package:PolyHxApp/redux/reducers/attendee-retrieval-reducer.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/redux/reducers/event-reducer.dart';
import 'package:PolyHxApp/redux/reducers/current-event-reducer.dart';
import 'package:PolyHxApp/redux/reducers/login-reducer.dart';

AppState appReducer(AppState state, action) {
  return AppState(
    eventState: eventReducer(state.eventState, action),
    currentEvent: currentEventReducer(state.currentEvent, action),
    loginState: loginReducer(state.loginState, action),
    activitiesScheduleState: activitiesScheduleReducer(state.activitiesScheduleState, action),
    activityState: activityReducer(state.activityState, action),
    attendeeRetrievalState: attendeeRetrievalReducer(state.attendeeRetrievalState, action)
  );
}

