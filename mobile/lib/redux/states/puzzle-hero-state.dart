import 'package:CSGamesApp/domain/puzzle-hero.dart';
import 'package:meta/meta.dart';

@immutable
class PuzzleHeroState {
    final PuzzleHero puzzleHero;
    final bool isLoading;
    final bool hasErrors;

    PuzzleHeroState({this.puzzleHero, this.isLoading, this.hasErrors});

    factory PuzzleHeroState.initial() => PuzzleHeroState(puzzleHero: null, isLoading: false, hasErrors: false);

    factory PuzzleHeroState.loading() => PuzzleHeroState(puzzleHero: null, isLoading: true, hasErrors: false);

    factory PuzzleHeroState.error() => PuzzleHeroState(puzzleHero: null, isLoading: false, hasErrors: true);
}