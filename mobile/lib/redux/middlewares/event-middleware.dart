import 'dart:async';

import 'package:CSGamesApp/redux/actions/event-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:CSGamesApp/services/token.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class EventMiddleware implements EpicClass<AppState> {
  final EventsService _eventsService;
  final TokenService _tokenService;
  
  EventMiddleware(this._eventsService, this._tokenService);

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<LoadEventsAction>())
        .switchMap((_) => _fetchEvents()),
      Observable(actions)
        .ofType(TypeToken<IsLoggedInAction>())
        .switchMap((action) => _checkLogin(action.completer))
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
    bool result = await this._tokenService.validateTokens();
    completer.complete(result);
    yield InitAction();
  }
}
