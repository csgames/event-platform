import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:redux/redux.dart';

final currentAttendeeReducer = combineReducers<Attendee>([
  TypedReducer<Attendee, SetCurrentAttendeeAction>(_setCurrentAttendee)
]);

Attendee _setCurrentAttendee(_, SetCurrentAttendeeAction action) {
  return action.attendee;
}