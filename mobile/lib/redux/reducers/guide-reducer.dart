import 'package:CSGamesApp/redux/actions/guide-actions.dart';
import 'package:CSGamesApp/redux/states/guide-state.dart';
import 'package:redux/redux.dart';

final guideReducer = combineReducers<GuideState>([
    TypedReducer<GuideState, GuideLoadedAction>(_setLoadedGuide),
    TypedReducer<GuideState, GuideNotLoadedAction>(_setNotLoadedGuide),
    TypedReducer<GuideState, InitGuideAction>(_setInitial)
]);

GuideState _setLoadedGuide(GuideState state, GuideLoadedAction action) {
    return GuideState(guide: action.guide, isLoading: false, hasErrors: false);
}

GuideState _setNotLoadedGuide(GuideState state, GuideNotLoadedAction action) {
    return GuideState.error();
}

GuideState _setInitial(GuideState state, InitGuideAction action) {
    return GuideState.initial();
}
