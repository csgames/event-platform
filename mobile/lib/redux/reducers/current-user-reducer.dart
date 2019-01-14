import 'package:CSGamesApp/domain/user.dart';
import 'package:CSGamesApp/redux/actions/profile-actions.dart';
import 'package:redux/redux.dart';

final currentUserReducer = combineReducers<User>([
  TypedReducer<User, SetCurrentUserAction>(_setCurrentUser)
]);
 
User _setCurrentUser(_, SetCurrentUserAction action) {
  return action.user;
}