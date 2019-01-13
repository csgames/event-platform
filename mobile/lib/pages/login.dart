import 'package:PolyHxApp/components/loading-overlay.dart';
import 'package:PolyHxApp/redux/actions/login-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
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
                        child: Material(
                            child: TextFormField(
                                style: TextStyle(
                                    color: Constants.polyhxGrey,
                                    fontFamily: "OpenSans",
                                    fontSize: 16.0
                                ),
                                keyboardType: TextInputType.emailAddress,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(8.0),
                                    focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Constants.polyhxRed)
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Colors.black45)
                                    ),
                                    hintText: _values["email"],
                                    hintStyle: TextStyle(fontFamily: 'OpenSans', color: Colors.black45),
                                    prefixIcon: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Icon(
                                            Icons.person_outline,
                                            color: Constants.polyhxRed
                                        )
                                    ),
                                    border: InputBorder.none
                                ),
                                onSaved: (val) => _email = val
                            )
                        )
                    ),
                    Padding(
                        padding: EdgeInsets.only(bottom: 20.0, right: 10.0),
                        child: Material(
                            borderRadius: BorderRadius.circular(8.0),
                            child: TextFormField(
                                style: TextStyle(color: Constants.polyhxGrey),
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(8.0),
                                    focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Constants.polyhxRed)
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                        borderSide: BorderSide(color: Colors.black45)
                                    ),
                                    hintText: _values["pwd"],
                                    hintStyle: TextStyle(fontFamily: 'OpenSans', color: Colors.black45),
                                    prefixIcon: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Icon(
                                            Icons.lock_outline,
                                            color: Constants.polyhxRed
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
                        padding: EdgeInsets.only(bottom: 10.0),
                        child: Text(
                            model.hasError ? model.message : '',
                            style: TextStyle(color: Colors.red, fontSize: 16.0)
                        )
                    ),
                    PillButton(
                        onPressed: () {
                            _formKey.currentState.save();
                            FocusScope.of(context).requestFocus(FocusNode());
                            model.login(_email, _password, context);
                        },
                        enabled: !model.isLoading,
                        child: Padding(
                            padding: EdgeInsets.fromLTRB(16.0, 12.5, 16.0, 12.5),
                            child: Text(
                                _values['login'],
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.w400,
                                    fontFamily: 'OpenSans'
                                )
                            )
                        )
                    )
                ]
            )
        );
    }

    Widget _buildLoginCardContent(_LoginPageViewModel loginPageViewModel) {
        var children = <Widget>[
            Container(
                color: Colors.transparent,
                margin: EdgeInsets.all(15.0),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                        Padding(
                            padding: EdgeInsets.all(10.0),
                            child: Image.asset(
                                'assets/logo.png',
                            )
                        ),
                        Container(
                            width: 340.0,
                            child: buildLoginForm(loginPageViewModel)
                        )
                    ]
                )
            )
        ];
        if (loginPageViewModel.isLoading) {
            children.add(LoadingOverlay());
        }

        return Stack(
            children: children
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
                return Scaffold(
                    backgroundColor: Constants.polyhxRed,
                    body: Center(
                        child: Container(
                            width: 330.0,
                            height: 400.0,
                            child: Material(
                                elevation: 1.0,
                                borderRadius: BorderRadius.circular(10.0),
                                child: _buildLoginCardContent(loginPageViewModel)
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
