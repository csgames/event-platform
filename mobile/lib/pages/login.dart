import 'package:flutter/material.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:PolyHxApp/utils/routes.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class LoginPage extends StatefulWidget {
  AuthService _authService;

  LoginPage(this._authService, {Key key}) : super(key: key);

  @override
  _LoginPageState createState() => new _LoginPageState(_authService);
}

class _LoginPageState extends State<LoginPage> {
  static const String LOGIN_FAILED_MESSAGE = 'Login failed.';
  final _formKey = new GlobalKey<FormState>();
  AuthService _authService;
  String _email;
  String _password;
  String _loginFeedbackMessage = '';

  bool loading = false;

  _LoginPageState(this._authService);

  void _login() {
    setState(() => loading = true);
    _formKey.currentState.save();
    _authService.login(_email, _password).then((loggedIn) {
      if (loggedIn && _authService.CurrentUser != null) {
        setState(() {
          _loginFeedbackMessage = '';
        });
        Navigator.of(context).pushNamed(Routes.HOME);
      } else {
        setState(() {
          _loginFeedbackMessage = LOGIN_FAILED_MESSAGE;
        });
      }
      setState(() => loading = false);
    });
  }

  Widget buildLoginForm() {
    return new Form(
      key: _formKey,
      child: new Column(
        children: <Widget>[
          new Padding(
            padding: new EdgeInsets.only(bottom: 10.0, right: 10.0),
            child: new TextFormField(
              style: new TextStyle(color: Constants.POLYHX_GREY),
              keyboardType: TextInputType.emailAddress,
              decoration: new InputDecoration(
                labelText: 'Email',
                icon: new Icon(Icons.person_outline, color: Constants.POLYHX_GREY),
              ),
              onSaved: (val) => _email = val,
            ),
          ),
          new Padding(
            padding: new EdgeInsets.only(bottom: 40.0, right: 10.0),
            child: new TextFormField(
              style: new TextStyle(color: Constants.POLYHX_GREY),
              decoration: new InputDecoration(
                  labelText: 'Password', icon: new Icon(Icons.lock_outline, color: Constants.POLYHX_GREY)),
              onSaved: (val) => _password = val,
              obscureText: true,
            ),
          ),
          new PillButton(
            onPressed: _login,
            enabled: !loading,
            child: new Padding(
              padding: new EdgeInsets.fromLTRB(25.0, 10.0, 25.0, 10.0),
              child: new Text('Login',
                style: new TextStyle(
                  color: Colors.white,
                  fontSize: 20.0,
                ),
              ),
            ),
          ),
          new Padding(
              padding: new EdgeInsets.only(top: 20.0),
              child: new Text(
                _loginFeedbackMessage,
                style: new TextStyle(color: Colors.red, fontSize: 16.0),
              )),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Constants.POLYHX_RED,
      body: new Center(
          child: new Material(
        elevation: 4.0,
        borderRadius: new BorderRadius.circular(5.0),
        color: Colors.transparent,
        child: new Container(
          color: Colors.white,
          width: 330.0,
          height: 450.0,
          child: new Stack(
            children: <Widget>[
              new Container(
                  color: Colors.transparent,
                  margin: new EdgeInsets.all(15.0),
                  child: new Column(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
                    new Image.asset('assets/logo.png', fit: BoxFit.contain),
                    new Container(width: 340.0, child: buildLoginForm()),
                  ])),
              loading ? new LoadingSpinner() : new Container()
            ],
          ),
        ),
      )),
    );
  }
}
