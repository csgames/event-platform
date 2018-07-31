import 'package:flutter/material.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/utils/routes.dart';

class LoginPage extends StatefulWidget {
  final AuthService _authService;

  LoginPage(this._authService, {Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState(_authService);
}

class _LoginPageState extends State<LoginPage> {
  static const String LOGIN_FAILED_MESSAGE = 'Login failed.';
  final _formKey = GlobalKey<FormState>();
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
      if (loggedIn && _authService.currentUser != null) {
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
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(bottom: 10.0, right: 10.0),
            child: TextFormField(
              style: TextStyle(color: Constants.polyhxGrey),
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: 'Email',
                icon: Icon(Icons.person_outline, color: Constants.polyhxGrey),
              ),
              onSaved: (val) => _email = val,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(bottom: 40.0, right: 10.0),
            child: TextFormField(
              style: TextStyle(color: Constants.polyhxGrey),
              decoration: InputDecoration(
                  labelText: 'Password', icon: Icon(Icons.lock_outline, color: Constants.polyhxGrey)),
              onSaved: (val) => _password = val,
              obscureText: true,
            ),
          ),
          PillButton(
            onPressed: _login,
            enabled: !loading,
            child: Padding(
              padding: EdgeInsets.fromLTRB(25.0, 10.0, 25.0, 10.0),
              child: Text('Login',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20.0,
                ),
              ),
            ),
          ),
          Padding(
              padding: EdgeInsets.only(top: 20.0),
              child: Text(
                _loginFeedbackMessage,
                style: TextStyle(color: Colors.red, fontSize: 16.0),
              )),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Constants.polyhxRed,
      body: Center(
          child: Material(
        elevation: 4.0,
        borderRadius: BorderRadius.circular(5.0),
        color: Colors.transparent,
        child: Container(
          color: Colors.white,
          width: 330.0,
          height: 450.0,
          child: Stack(
            children: <Widget>[
              Container(
                  color: Colors.transparent,
                  margin: EdgeInsets.all(15.0),
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
                    Image.asset('assets/logo.png', fit: BoxFit.contain),
                    Container(width: 340.0, child: buildLoginForm()),
                  ])),
              loading ? LoadingSpinner() : Container()
            ],
          ),
        ),
      )),
    );
  }
}
