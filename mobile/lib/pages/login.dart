import 'package:PolyHxApp/redux/actions/login-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  Map<String, dynamic> _values;
  String _email;
  String _password;

  Widget buildLoginForm(_LoginPageViewModel model) {
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
                labelText: _values['email'],
                icon: Icon(Icons.person_outline, color: Constants.polyhxGrey)
              ),
              onSaved: (val) => _email = val
            )
          ),
          Padding(
            padding: EdgeInsets.only(bottom: 40.0, right: 10.0),
            child: TextFormField(
              style: TextStyle(color: Constants.polyhxGrey),
              decoration: InputDecoration(
                labelText: _values['pwd'],
                icon: Icon(Icons.lock_outline, color: Constants.polyhxGrey)
              ),
              onSaved: (val) => _password = val,
              obscureText: true
            )
          ),
          PillButton(
            onPressed: () {
              _formKey.currentState.save();
              model.login(_email, _password, context);
            },
            enabled: !model.isLoading,
            child: Padding(
              padding: EdgeInsets.fromLTRB(25.0, 12.5, 25.0, 12.5),
              child: Text(
                _values['login'],
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20.0,
                )
              )
            )
          ),
          Padding(
            padding: EdgeInsets.only(top: 20.0),
            child: Text(
              model.hasError ? model.message: '',
              style: TextStyle(color: Colors.red, fontSize: 16.0)
            )
          )
        ]
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _LoginPageViewModel>(
      onInit: (_) => _values = LocalizationService.of(context).login,
      converter: (store) => _LoginPageViewModel.fromStore(store),
      builder: (BuildContext context, _LoginPageViewModel loginPageViewModel) {
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
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Image.asset(
                            'assets/logo.png',
                            fit: BoxFit.contain
                          ),
                          Container(
                            width: 340.0,
                            child: buildLoginForm(loginPageViewModel)
                          )
                        ]
                      )
                    ),
                    loginPageViewModel.isLoading ? LoadingSpinner() : Container()
                  ]
                )
              )
            )
          )
        );
    });
  }
}

class _LoginPageViewModel {
  bool isLoading;
  bool hasError;
  String message;
  Function login;

  _LoginPageViewModel(this.isLoading, this.hasError, this.message, this.login);

  _LoginPageViewModel.fromStore(Store<AppState> store) {
    isLoading = store.state.loginState.isLoading;
    hasError = store.state.loginState.hasError;
    message = store.state.loginState.message;
    login = (email, password, context) => store.dispatch(LoginAction(email, password, context));
  }
}
