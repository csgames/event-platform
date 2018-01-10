import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:PolyHxApp/pages/login.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/services/token.service.dart';

void main() {
  var client = new Client();
  var tokenService = new TokenService(client);
  var authService = new AuthService(client, tokenService);
  runApp(new PolyHxApp(authService));
}

class PolyHxApp extends StatelessWidget {
  AuthService _authService;

  PolyHxApp(this._authService);

  @override
  Widget build(BuildContext context) {
    final Color POLYHX_RED = new Color.fromARGB(255, 239, 72, 93);
    final Color POLYHX_GREY = new Color.fromARGB(0xFF, 0x44, 0x44, 0x44);
    return new MaterialApp(
      title: 'PolyHx',
      theme: new ThemeData(
        accentColor: Colors.white,
        buttonColor: POLYHX_RED,
        hintColor: Colors.white,
        primaryColor: POLYHX_RED,
        scaffoldBackgroundColor: POLYHX_GREY,
        textSelectionColor: POLYHX_RED,
      ),
      home: new LoginPage(_authService),
    );
  }
}