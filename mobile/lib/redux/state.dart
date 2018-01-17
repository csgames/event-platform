import 'package:PolyHxApp/domain/event.dart';
import 'package:meta/meta.dart';

@immutable
class AppState {
  List<Event> events;
  Event currentEvent;

  AppState({this.events, this.currentEvent});
}