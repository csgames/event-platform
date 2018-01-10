import 'package:flutter/material.dart';
import 'pages/login.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
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
      home: new LoginPage(),
    );
  }
}