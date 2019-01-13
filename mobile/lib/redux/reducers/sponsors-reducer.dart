import 'package:PolyHxApp/redux/actions/sponsors-actions.dart';
import 'package:PolyHxApp/redux/states/sponsors-state.dart';
import 'package:redux/redux.dart';

final sponsorsReducer = combineReducers<SponsorsState>([
  TypedReducer<SponsorsState, SponsorsLoadedAction>(_setLoadedSponsors),
  TypedReducer<SponsorsState, SponsorsNotLoadedAction>(_setNoSponsors),
  TypedReducer<SponsorsState, LoadSponsorsAction>(_onLoadSponsors),
  TypedReducer<SponsorsState, ResetSponsorsAction>(_setInitial)
]);

SponsorsState _setLoadedSponsors(SponsorsState state, SponsorsLoadedAction action) {
  return SponsorsState(sponsors: action.sponsors, isLoading: false, hasErrors: false);
}

SponsorsState _setNoSponsors(SponsorsState state, SponsorsNotLoadedAction action) {
  return SponsorsState.error();
}

SponsorsState _onLoadSponsors(SponsorsState state, LoadSponsorsAction action) {
  return SponsorsState.loading();
}

SponsorsState _setInitial(SponsorsState state, ResetSponsorsAction action) {
  return SponsorsState.initial();
}