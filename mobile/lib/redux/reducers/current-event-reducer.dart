import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:redux/redux.dart';

final currentEventReducer = combineReducers<Event>([
  TypedReducer<Event, SetCurrentEventAction>(_setCurrentEvent)
]);
 
Event _setCurrentEvent(event, SetCurrentEventAction action) {
  return action.event;
}