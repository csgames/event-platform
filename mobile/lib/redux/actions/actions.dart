import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';

class LoadEventsAction {}

class EventsLoadedAction {
  final List<Event> events;

  EventsLoadedAction(this.events);
}

class EventsNotLoadedAction {}

class SetCurrentEventAction {
  final Event event;

  SetCurrentEventAction(this.event);
}