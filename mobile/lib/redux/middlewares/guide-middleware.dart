import 'package:CSGamesApp/redux/actions/guide-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class GuideMiddleware implements EpicClass<AppState> {
    final EventsService _eventsService;

    GuideMiddleware(this._eventsService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable(actions)
            .ofType(TypeToken<LoadGuideAction>())
            .switchMap((_) => _fetchGuide());
    }

    Stream<dynamic> _fetchGuide() async* {
        try {
            yield GuideLoadedAction(await this._eventsService.getGuide());
        } catch (err) {
            print('An error occured while getting the guide: $err');
            yield GuideNotLoadedAction();
        }
    }
}