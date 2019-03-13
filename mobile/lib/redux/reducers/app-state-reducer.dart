import 'package:CSGamesApp/redux/reducers/activities-schedule-reducer.dart';
import 'package:CSGamesApp/redux/reducers/activities-subscription-reducer.dart';
import 'package:CSGamesApp/redux/reducers/activity-reducer.dart';
import 'package:CSGamesApp/redux/reducers/attendee-retrieval-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-attendee-reducer.dart';
import 'package:CSGamesApp/redux/reducers/guide-reducer.dart';
import 'package:CSGamesApp/redux/reducers/notification-reducer.dart';
import 'package:CSGamesApp/redux/reducers/profile-reducer.dart';
import 'package:CSGamesApp/redux/reducers/sponsors-reducer.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/reducers/event-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-event-reducer.dart';
import 'package:CSGamesApp/redux/reducers/login-reducer.dart';
import 'package:CSGamesApp/redux/reducers/current-team-reducer.dart';
import 'package:CSGamesApp/redux/reducers/puzzles-reducer.dart';
import 'package:CSGamesApp/redux/reducers/puzzle-hero-reducer.dart';

AppState appReducer(AppState state, action) {
    return AppState(
        guideState: guideReducer(state.guideState, action),
        eventState: eventReducer(state.eventState, action),
        loginState: loginReducer(state.loginState, action),
        puzzlesState: puzzlesReducer(state.puzzlesState, action),
        profileState: profileReducer(state.profileState, action),
        currentTeam: currentTeamReducer(state.currentTeam, action),
        sponsorsState: sponsorsReducer(state.sponsorsState, action),
        activityState: activityReducer(state.activityState, action),
        currentEvent: currentEventReducer(state.currentEvent, action),
        puzzleHeroState: puzzleHeroReducer(state.puzzleHeroState, action),
        currentAttendee: currentAttendeeReducer(state.currentAttendee, action),
        notificationState: notificationReducer(state.notificationState, action),
        attendeeRetrievalState: attendeeRetrievalReducer(state.attendeeRetrievalState, action),
        activitiesScheduleState: activitiesScheduleReducer(state.activitiesScheduleState, action),
        activitiesSubscriptionState: activitiesSubscriptionReducer(state.activitiesSubscriptionState, action)
    );
}

