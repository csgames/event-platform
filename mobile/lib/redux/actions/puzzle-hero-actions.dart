import 'package:CSGamesApp/domain/puzzle-hero.dart';

class LoadPuzzleHeroAction {}

class PuzzleHeroLoadedAction {
    final PuzzleHero puzzleHero;

    PuzzleHeroLoadedAction(this.puzzleHero);
}

class PuzzleHeroNotLoadedAction {}

class ResetPuzzleHeroAction {}
