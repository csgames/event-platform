import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:redux/redux.dart';

final currentAttendeeReducer = combineReducers<Attendee>([
  TypedReducer<Attendee, SetCurrentAttendeeAction>(_setCurrentAttendee),
  TypedReducer<Attendee, ResetCurrentAttendeeAction>(_setNoAttendee)
]);

Attendee _setCurrentAttendee(_, SetCurrentAttendeeAction action) {
  return action.attendee;
}

Attendee _setNoAttendee(_, ResetCurrentAttendeeAction action) {
    return null;
}
