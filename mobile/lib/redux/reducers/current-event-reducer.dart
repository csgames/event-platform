import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:redux/redux.dart';

final currentEventReducer = combineTypedReducers<Event>([
  new ReducerBinding<Event, SetCurrentEventAction>(_setCurrentEvent)
]);
 
Event _setCurrentEvent(Event, SetCurrentEventAction action) {
  return action.event;
}