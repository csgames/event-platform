import 'package:CSGamesApp/redux/actions/puzzle-actions.dart';
import 'package:CSGamesApp/redux/states/puzzle-state.dart';
import 'package:redux/redux.dart';

final puzzlesReducer = combineReducers<PuzzlesState>([
    TypedReducer<PuzzlesState, ScanAction>(_setScan),
    TypedReducer<PuzzlesState, ValidateAction>(_setValidate),
    TypedReducer<PuzzlesState, ScanErrorAction>(_setScanError),
    TypedReducer<PuzzlesState, IncorrectPuzzleAction>(_setValidateError),
    TypedReducer<PuzzlesState, ScanSuccess>(_setScanned),
    TypedReducer<PuzzlesState, SetPuzzleAction>(_setPuzzle),
    TypedReducer<PuzzlesState, ResetPuzzleAction>(_setInitial)
]);

PuzzlesState _setInitial(PuzzlesState state, ResetPuzzleAction action) {
    return PuzzlesState.initial();
}

PuzzlesState _setScan(PuzzlesState state, ScanAction action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzleId] = PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: state.puzzles[action.puzzleId].hasValidationErrors,
        answer: state.puzzles[action.puzzleId].answer
    );
    return PuzzlesState(puzzles);
}

PuzzlesState _setScanned(PuzzlesState state, ScanSuccess action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzleId] = PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: false,
        answer: action.answer
    );
    return PuzzlesState(puzzles);
}

PuzzlesState _setValidate(PuzzlesState state, ValidateAction action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzleId] = PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: false,
        answer: state.puzzles[action.puzzleId].answer
    );
    return PuzzlesState(puzzles);
}

PuzzlesState _setScanError(PuzzlesState state, ScanErrorAction action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzleId] = PuzzleState(
        hasScanErrors: true,
        hasValidationErrors: false,
        answer: state.puzzles[action.puzzleId].answer
    );
    return PuzzlesState(puzzles);
}

PuzzlesState _setValidateError(PuzzlesState state, IncorrectPuzzleAction action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzleId] = PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: true,
        answer: state.puzzles[action.puzzleId].answer
    );
    return PuzzlesState(puzzles);
}

PuzzlesState _setPuzzle(PuzzlesState state, SetPuzzleAction action) {
    final puzzles = Map<String, PuzzleState>.from(state.puzzles);
    puzzles[action.puzzle.id] = PuzzleState(
        hasScanErrors: false,
        hasValidationErrors: false,
        answer: ''
    );
    return PuzzlesState(puzzles);
}
