import 'package:CSGamesApp/redux/actions/puzzle-hero-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/puzzle-hero.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class PuzzleHeroMiddleware extends EpicClass<AppState> {
    final PuzzleHeroService _puzzleHeroService;

    PuzzleHeroMiddleware(this._puzzleHeroService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<LoadPuzzleHeroAction>())
                .switchMap((_) => _fetchPuzzleHero()),
            Observable(actions)
                .ofType(TypeToken<LoadPuzzleHeroInfoAction>())
                .switchMap((_) => _fetchPuzzleHeroInfo())
        ]);
    }

    Stream<dynamic> _fetchPuzzleHero() async* {
        try {

            yield PuzzleHeroLoadedAction(await _puzzleHeroService.getPuzzleHero());
        } catch (err) {
            print('An error occured while getting the puzzle hero : $err');
            yield PuzzleHeroNotLoadedAction();
        }
    }

    Stream<dynamic> _fetchPuzzleHeroInfo() async* {
        try {
            final open = await _puzzleHeroService.getPuzzleHeroInfo();
            if (open) {
                yield PuzzleHeroOpenAction();
            } else {
                yield PuzzleHeroNotOpenAction();
            }
        } catch (err) {
            yield PuzzleHeroNotLoadedAction();
        }
    }
}