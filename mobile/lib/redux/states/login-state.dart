import 'package:meta/meta.dart';

@immutable
class LoginState {
  final bool isLoading;
  final bool hasError;
  final String message;

  LoginState({this.isLoading, this.hasError, this.message});

  factory LoginState.initial() => LoginState(isLoading: false, hasError: false);

  factory LoginState.loading() => LoginState(isLoading: true, hasError: false);
}