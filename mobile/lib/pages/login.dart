import 'dart:ui';

import 'package:CSGamesApp/components/loading-overlay.dart';
import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/redux/actions/login-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
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
                        child: Material(
                            child: TextFormField(
                                style: TextStyle(
                                    color: Constants.polyhxGrey,
                                    fontFamily: "Montserrat",
                                    fontSize: 16.0
                                ),
                                keyboardType: TextInputType.emailAddress,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(8.0),
                                    focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Constants.csBlue)
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Colors.black45)
                                    ),
                                    hintText: _values["email"],
                                    hintStyle: TextStyle(fontFamily: 'Montserrat', color: Colors.black45),
                                    prefixIcon: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Icon(
                                            Icons.person_outline,
                                            color: Constants.csBlue
                                        )
                                    ),
                                    border: InputBorder.none
                                ),
                                onSaved: (val) => _email = val
                            )
                        )
                    ),
                    Padding(
                        padding: EdgeInsets.only(bottom: 12.5, right: 10.0),
                        child: Material(
                            borderRadius: BorderRadius.circular(8.0),
                            child: TextFormField(
                                style: TextStyle(color: Constants.polyhxGrey),
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(8.0),
                                    focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Constants.csBlue)
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Colors.black45)
                                    ),
                                    hintText: _values["pwd"],
                                    hintStyle: TextStyle(fontFamily: 'Montserrat', color: Colors.black45),
                                    prefixIcon: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Icon(
                                            Icons.lock_outline,
                                            color: Constants.csBlue
                                        )
                                    ),
                                    border: InputBorder.none
                                ),
                                onSaved: (val) => _password = val,
                                obscureText: true,
                            )
                        )
                    ),
                    Padding(
                        padding: EdgeInsets.only(bottom: 5.0),
                        child: Text(
                            model.hasError ? model.message : '',
                            style: TextStyle(color: Colors.red, fontSize: 16.0)
                        )
                    ),
                    PillButton(
                        color: Constants.csBlue,
                        onPressed: () {
                            _formKey.currentState.save();
                            FocusScope.of(context).requestFocus(FocusNode());
                            model.login(_email, _password, context);
                        },
                        enabled: !model.isLoading,
                        child: Padding(
                            padding: EdgeInsets.fromLTRB(16.0, 12.5, 16.0, 12.5),
                            child: Text(
                                _values['login'].toUpperCase(),
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.w400,
                                    fontFamily: 'Montserrat'
                                )
                            )
                        )
                    )
                ]
            )
        );
    }

    Widget _buildLoginCardContent(_LoginPageViewModel loginPageViewModel) {
        return Stack(
            children: <Widget>[
                Container(
                    color: Colors.transparent,
                    margin: EdgeInsets.all(15.0),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                            Container(
                                margin: EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 20.0),
                                child: Image.asset(
                                    'assets/logo.png',
                                    fit: BoxFit.cover
                                )
                            ),
                            Container(
                                width: 340.0,
                                child: buildLoginForm(loginPageViewModel)
                            ),
                            Container(
                                margin: EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 0.0),
                                child: Image.asset(
                                    'assets/squarepoint.png',
                                    fit: BoxFit.cover
                                )
                            )
                        ]
                    )
                ),
                if (loginPageViewModel.isLoading)
                    LoadingOverlay()
            ]
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _LoginPageViewModel>(
            onInit: (_) =>
            _values = LocalizationService
                .of(context)
                .login,
            converter: (store) => _LoginPageViewModel.fromStore(store),
            builder: (BuildContext context, _LoginPageViewModel loginPageViewModel) {
                return Container(
                    decoration: BoxDecoration(
                        image: DecorationImage(
                            alignment: Alignment.topCenter,
                            image: NetworkImage('http://csgames.org/img/hp-hero.jpg'),
                            fit: BoxFit.cover
                        ),
                    ),
                    child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 6.0, sigmaY: 6.0),
                        child: Container(
                            decoration: BoxDecoration(color: Colors.white.withOpacity(0.0)),
                            child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                    Stack(
                                        children: <Widget>[
                                            Container(
                                                width: 330.0,
                                                height: 450,
                                                child: Material(
                                                    elevation: 1.0,
                                                    borderRadius: BorderRadius.circular(0.0),
                                                    color: Colors.white,
                                                    child: _buildLoginCardContent(loginPageViewModel)
                                                )
                                            ),
                                            Positioned(
                                                top: 0.0,
                                                child: Center(
                                                    child: Container(
                                                        width: 150,
                                                        height: 6,
                                                        child: Material(
                                                            color: Constants.csBlue,
                                                            child: Text('')
                                                        )
                                                    )
                                                )
                                            )
                                        ]
                                    )
                                ]
                            )
                        )
                    )
                );
            }
        );
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
