import 'package:CSGamesApp/redux/actions/login-actions.dart';
import 'package:CSGamesApp/redux/states/login-state.dart';
import 'package:redux/redux.dart';

final loginReducer = combineReducers<LoginState>([
  TypedReducer<LoginState, LoginAction>(_setLoginAction),
  TypedReducer<LoginState, LoginFail>(_setError),
  TypedReducer<LoginState, LogOut>(_setInitial)
]);

LoginState _setLoginAction(LoginState loginState, LoginAction action) {
  return LoginState.loading();
}

LoginState _setError(LoginState loginState, LoginFail action) {
  return LoginState(isLoading: false, hasError: true, message: action.message);
}

LoginState _setInitial(LoginState loginState, LogOut action) {
  return LoginState.initial();
}