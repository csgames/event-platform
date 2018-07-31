import 'package:PolyHxApp/domain/event.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  final List<Event> events;
  final Event currentEvent;

  AppState({this.events, this.currentEvent});
}