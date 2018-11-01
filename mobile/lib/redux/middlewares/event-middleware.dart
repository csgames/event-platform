import 'dart:async';

import 'package:PolyHxApp/redux/actions/event-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class EventMiddleware implements EpicClass<AppState> {
  final EventsService eventsService;
  final TokenService _tokenService;
  
  EventMiddleware(this.eventsService, this._tokenService);

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
      yield EventsLoadedAction(await this.eventsService.getAllEvents());
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
