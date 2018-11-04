import 'package:PolyHxApp/redux/reducers/activities-schedule-reducer.dart';
import 'package:PolyHxApp/redux/reducers/activity-reducer.dart';
import 'package:PolyHxApp/redux/reducers/attendee-retrieval-reducer.dart';
import 'package:PolyHxApp/redux/reducers/current-user-reducer.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/redux/reducers/event-reducer.dart';
import 'package:PolyHxApp/redux/reducers/current-event-reducer.dart';
import 'package:PolyHxApp/redux/reducers/login-reducer.dart';

AppState appReducer(AppState state, action) {
  return AppState(
    eventState: eventReducer(state.eventState, action),
    loginState: loginReducer(state.loginState, action),
    currentUser: currentUserReducer(state.currentUser, action),
    activityState: activityReducer(state.activityState, action),
    currentEvent: currentEventReducer(state.currentEvent, action),
    attendeeRetrievalState: attendeeRetrievalReducer(state.attendeeRetrievalState, action),
    activitiesScheduleState: activitiesScheduleReducer(state.activitiesScheduleState, action)
  );
}

