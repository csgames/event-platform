import 'package:CSGamesApp/domain/puzzle-hero.dart';
import 'package:flutter/material.dart';

class ScanAction {
    final String puzzleId;
    final BuildContext context;

    ScanAction(this.puzzleId, this.context);
}

class ValidateAction {
    final String answer;
    final String puzzleId;
    final BuildContext context;

    ValidateAction(this.answer, this.puzzleId, this.context);
}

class ScanErrorAction {
    final String puzzleId;

    ScanErrorAction(this.puzzleId);
}

class ScanSuccess {
    final String answer;
    final String puzzleId;

    ScanSuccess(this.answer, this.puzzleId);
}

class IncorrectPuzzleAction {
    final String puzzleId;

    IncorrectPuzzleAction(this.puzzleId);
}

class SetPuzzleAction {
    final PuzzleInfo puzzle;

    SetPuzzleAction(this.puzzle);
}

class ResetPuzzleAction {}