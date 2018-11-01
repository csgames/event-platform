import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/event-actions.dart';
import 'package:redux/redux.dart';

final currentEventReducer = combineReducers<Event>([
  TypedReducer<Event, SetCurrentEventAction>(_setCurrentEvent)
]);
 
Event _setCurrentEvent(_, SetCurrentEventAction action) {
  return action.event;
}