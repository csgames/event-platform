import 'package:CSGamesApp/domain/puzzle-hero.dart';

class LoadPuzzleHeroAction {}

class LoadPuzzleHeroInfoAction {}

class PuzzleHeroNotOpenAction {}

class PuzzleHeroOpenAction {}

class PuzzleHeroLoadedAction {
    final PuzzleHero puzzleHero;

    PuzzleHeroLoadedAction(this.puzzleHero);
}

class PuzzleHeroNotLoadedAction {}

class ResetPuzzleHeroAction {}
