import 'package:flutter/material.dart';
import 'package:PolyHxApp/services/auth.service.dart';

class HomePage extends StatefulWidget {
  AuthService _authService;

  HomePage(this._authService, {Key key}) : super(key: key);

  @override
  _HomePageState createState() => new _HomePageState(_authService);
}

class _HomePageState extends State<HomePage> {
  AuthService _authService;
  String _userInfo;

  _HomePageState(this._authService);

  void _updateUserInfo() {
    setState(() {
      _userInfo = 'Hello ${_authService.CurrentUser.firstName} ${_authService.CurrentUser.lastName}';
    });
  }

  @override
  Widget build(BuildContext context) {
    _updateUserInfo();
    return new Scaffold(
        body: new Center(
          child: new Text(_userInfo, style: new TextStyle(color: Colors.white)),
        )
    );
  }
}
