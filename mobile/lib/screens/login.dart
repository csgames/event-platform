import 'package:flutter/material.dart';
import '../components/pillbutton.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _email;
  String _password;

  void _submit() {
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Image.asset('assets/logo.png'),
            new Container(
              width: 320.0,
              child: new Form(
                child: new Column(
                  children: <Widget>[
                    new Padding(
                      padding: new EdgeInsets.only(bottom: 10.0),
                      child: new TextFormField(
                        style: new TextStyle(color: Colors.white),
                        decoration: new InputDecoration(
                          labelText: 'Email',
                        ),
                        onSaved: (val) => _email = val,
                      ),
                    ),
                    new Padding(
                      padding: new EdgeInsets.only(bottom: 40.0),
                      child: new TextFormField(
                        style: new TextStyle(color: Colors.white),
                        decoration: new InputDecoration(
                          labelText: 'Password',
                        ),
                        onSaved: (val) => _password = val,
                        obscureText: true,
                      ),
                    ),
                    new PillButton(
                      text: 'LogIn',
                      textColor: Colors.white,
                      onPressed: _submit,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
