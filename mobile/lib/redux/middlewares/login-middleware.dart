import 'dart:async';

import 'package:PolyHxApp/redux/actions/login-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/utils/routes.dart';
import 'package:flutter/material.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class LoginMiddleware implements EpicClass<AppState> {
  final AuthService _authService;

  LoginMiddleware(this._authService);

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<LoginAction>())
        .switchMap((action) => _login(action)),
      Observable(actions)
        .ofType(TypeToken<LogOut>())
        .switchMap((action) => _logout(action.context))
    ]);
  }

  Stream<dynamic> _login(LoginAction action) async* {
    try {
      if (action.email == '' || action.password == '') {
        yield LoginFail('Empty email or password');
        return;
      }
      await this._authService.login(action.email, action.password);
      Navigator.pushReplacementNamed(action.context, Routes.HOME);
    } catch (err) {
      print('An error occured while trying to login: $err');
      if (err == 'Unauthenticated') {
        yield LoginFail('Invalid email or password');
        return;
      }
      else yield LoginFail('Login Failed');
    }
  }

  Stream<dynamic> _logout(BuildContext context) async* {
    _authService.logout();
    Navigator.pushReplacementNamed(context, Routes.LOGIN);
  }
}