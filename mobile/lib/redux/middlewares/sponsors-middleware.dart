import 'package:CSGamesApp/redux/actions/sponsors-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class SponsorsMiddleware extends EpicClass<AppState> {
    final EventsService _eventsService;

    SponsorsMiddleware(this._eventsService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable(actions)
            .ofType(TypeToken<LoadSponsorsAction>())
            .switchMap((_) => _fetchSponsors());
    }

    Stream<dynamic> _fetchSponsors() async* {
        try {
            yield SponsorsLoadedAction(await this._eventsService.getAllSponsors());
        } catch (err) {
            print('An error occured while getting the sponsors: $err');
            yield SponsorsNotLoadedAction();
        }
    }
}