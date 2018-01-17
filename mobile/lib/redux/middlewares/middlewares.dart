import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:redux/redux.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/event-management.dart';

List<Middleware<AppState>> _createEventsMiddleware() {
  final loadEvents = _createLoadEvents(eventManagement)
  
  return combineTypedMiddleware([
    new MiddlewareBinding<AppState, LoadEventsAction>(middleware)
  ]);
}

Middleware<AppState> _createLoadEvents(EventManagementService eventManagement) {
  return (Store<AppState> store, action, NextDispatcher next) {

  }
}