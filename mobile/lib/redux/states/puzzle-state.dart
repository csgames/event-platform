import 'package:meta/meta.dart';

@immutable
class PuzzlesState {
    final Map<String, PuzzleState> puzzles;

    PuzzlesState(this.puzzles);

    factory PuzzlesState.initial() => PuzzlesState(Map<String, PuzzleState>());
}

@immutable
class PuzzleState {
    final bool hasScanErrors;
    final bool hasValidationErrors;
    final String answer;

    PuzzleState({this.hasScanErrors, this.hasValidationErrors, this.answer});

    factory PuzzleState.initial() => PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: false,
        answer: ''
    );
}