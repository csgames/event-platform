import 'package:CSGamesApp/redux/reducers/activities-schedule-reducer.dart';
import 'package:CSGamesApp/redux/reducers/activities-subscription-reducer.dart';
import 'package:CSGamesApp/redux/reducers/activity-reducer.dart';
import 'package:CSGamesApp/redux/reducers/attendee-retrieval-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-attendee-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-user-reducer.dart';
import 'package:CSGamesApp/redux/reducers/notification-reducer.dart';
import 'package:CSGamesApp/redux/reducers/profile-reducer.dart';
import 'package:CSGamesApp/redux/reducers/sponsors-reducer.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/reducers/event-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-event-reducer.dart';
import 'package:CSGamesApp/redux/reducers/login-reducer.dart';

AppState appReducer(AppState state, action) {
    return AppState(
        eventState: eventReducer(state.eventState, action),
        loginState: loginReducer(state.loginState, action),
        profileState: profileReducer(state.profileState, action),
        currentUser: currentUserReducer(state.currentUser, action),
        sponsorsState: sponsorsReducer(state.sponsorsState, action),
        activityState: activityReducer(state.activityState, action),
        currentEvent: currentEventReducer(state.currentEvent, action),
        currentAttendee: currentAttendeeReducer(state.currentAttendee, action),
        notificationState: notificationReducer(state.notificationState, action),
        attendeeRetrievalState: attendeeRetrievalReducer(state.attendeeRetrievalState, action),
        activitiesScheduleState: activitiesScheduleReducer(state.activitiesScheduleState, action),
        activitiesSubscriptionState: activitiesSubscriptionReducer(state.activitiesSubscriptionState, action)
    );
}

