import 'package:flutter/material.dart';

class LoginAction {
  final String email;
  final String password;
  final BuildContext context;

  LoginAction(this.email, this.password, this.context);
}

class LoginFail {
  final String message;

  LoginFail(this.message);
}

class LogOut {
  final BuildContext context;

  LogOut(this.context);
}