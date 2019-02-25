import 'dart:async';

import 'package:CSGamesApp/redux/actions/event-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/auth.service.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class EventMiddleware implements EpicClass<AppState> {
  final EventsService _eventsService;
  final AuthService _authService;
  final HttpClient _httpClient;
  
  EventMiddleware(this._eventsService, this._authService, this._httpClient);

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<LoadEventsAction>())
        .switchMap((_) => _fetchEvents()),
      Observable(actions)
        .ofType(TypeToken<IsLoggedInAction>())
        .switchMap((action) => _checkLogin(action.completer)),
      Observable(actions)
        .ofType(TypeToken<SetCurrentEventAction>())
        .switchMap((action) => _setCurrentEvent(store.state.currentEvent.id))
    ]);
  }

  Stream<dynamic> _fetchEvents() async* {
    try {
      yield EventsLoadedAction(await this._eventsService.getAllEvents());
    } catch (err) {
      print('An error occured while getting the events: $err');
      yield EventsNotLoadedAction();
    }
  }

  Stream<dynamic> _checkLogin(Completer completer) async* {
    bool result = await this._authService.checkLoggedIn();
    completer.complete(result);
    yield InitAction();
  }

  Stream<dynamic> _setCurrentEvent(String eventId) async* {
    this._httpClient.eventId = eventId;
  }
}
