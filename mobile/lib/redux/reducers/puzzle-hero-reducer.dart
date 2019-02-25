import 'package:CSGamesApp/redux/actions/puzzle-hero-actions.dart';
import 'package:CSGamesApp/redux/states/puzzle-hero-state.dart';
import 'package:redux/redux.dart';

final puzzleHeroReducer = combineReducers<PuzzleHeroState>([
    TypedReducer<PuzzleHeroState, PuzzleHeroLoadedAction>(_setCurrentPuzzleHero),
    TypedReducer<PuzzleHeroState, ResetPuzzleHeroAction>(_setNoPuzzle),
    TypedReducer<PuzzleHeroState, LoadPuzzleHeroAction>(_setLoading),
    TypedReducer<PuzzleHeroState, PuzzleHeroNotLoadedAction>(_setError)
]);

PuzzleHeroState _setCurrentPuzzleHero(_, PuzzleHeroLoadedAction action) {
    return PuzzleHeroState(puzzleHero: action.puzzleHero, isLoading: false, hasErrors: false);
}

PuzzleHeroState _setNoPuzzle(_, ResetPuzzleHeroAction action) {
    return PuzzleHeroState.initial();
}

PuzzleHeroState _setLoading(_, LoadPuzzleHeroAction action) {
    return PuzzleHeroState.loading();
}

PuzzleHeroState _setError(_, PuzzleHeroNotLoadedAction action) {
    return PuzzleHeroState.error();
}
