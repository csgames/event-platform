import 'package:CSGamesApp/domain/event.dart';
import 'package:meta/meta.dart';

@immutable
class EventState {
  final List<Event> events;
  final bool isLoading;
  final bool hasErrors;

  EventState({this.events, this.isLoading, this.hasErrors});

  factory EventState.initial() => EventState(events: [], isLoading: false, hasErrors: false);

  factory EventState.loading() => EventState(events: [], isLoading: true, hasErrors: false);

  factory EventState.error() => EventState(events: [], isLoading: false, hasErrors: true);
}