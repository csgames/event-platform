import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/redux/actions/profile-actions.dart';
import 'package:redux/redux.dart';

final currentTeamReducer = combineReducers<Team>([
    TypedReducer<Team, SetCurrentTeamAction>(_setCurrentTeam),
    TypedReducer<Team, ResetTeamAction>(_setNoTeam)
]);

Team _setCurrentTeam(_, SetCurrentTeamAction action) {
    return action.team;
}

Team _setNoTeam(_, ResetTeamAction action) {
    return null;
}
