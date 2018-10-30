import 'dart:async';

import 'package:PolyHxApp/domain/event.dart';

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

class ResetAction {}

class IsLoggedInAction {
  final Completer completer;

  IsLoggedInAction({Completer completer})
    : this.completer = completer ?? Completer();
}

class InitAction {}