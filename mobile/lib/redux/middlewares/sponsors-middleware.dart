import 'package:PolyHxApp/redux/actions/sponsors-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/sponsors.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class SponsorsMiddleware extends EpicClass<AppState> {
    final SponsorsService sponsorsService;

    SponsorsMiddleware(this.sponsorsService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable(actions)
            .ofType(TypeToken<LoadSponsorsAction>())
            .switchMap((action) => _fetchSponsors(action.eventId));
    }

    Stream<dynamic> _fetchSponsors(String eventId) async* {
        try {
            yield SponsorsLoadedAction(await this.sponsorsService.getAllSponsors(eventId));
        } catch (err) {
            print('An error occured while getting the sponsors: $err');
            yield SponsorsNotLoadedAction();
        }
    }
}