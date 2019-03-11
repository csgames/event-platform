import 'package:CSGamesApp/components/gravatar.dart';
import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/redux/actions/profile-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:redux/redux.dart';

class ProfilePage extends StatelessWidget {
    bool _isErrorDialogOpen = false;
    bool _isAttendeeScanned = false;

    Widget _buildAvatar(BuildContext context, _ProfilePageViewModel model) {
        double size = MediaQuery
            .of(context)
            .size
            .width * 0.4;
        return Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                    fit: BoxFit.fill,
                    image: Gravatar(model.attendee.email)
                )
            )
        );
    }

    Widget _buildName(_ProfilePageViewModel model) {
        return Padding(
            padding: EdgeInsets.all(10.0),
            child: Text(
                '${model.attendee.firstName} ${model.attendee.lastName}',
                style: TextStyle(
                    fontFamily: 'OpenSans',
                    fontSize: 35.0,
                    fontWeight: FontWeight.w600
                ),
                textAlign: TextAlign.center
            )
        );
    }

    Widget _buildTeam(_ProfilePageViewModel model) {
        return Text(
            '${model.team.name}',
            style: TextStyle(
                fontFamily: 'OpenSans',
                fontSize: 30.0,
                fontWeight: FontWeight.w400
            ),
            textAlign: TextAlign.center,
        );
    }

    Widget _buildSchool(BuildContext context, _ProfilePageViewModel model) {
        return Container(
            padding: EdgeInsets.all(10.0),
            width: MediaQuery
                .of(context)
                .size
                .width,
            child: Text(
                '${model.team.school.name}',
                style: TextStyle(
                    fontFamily: 'OpenSans',
                    fontSize: 20.0,
                    fontWeight: FontWeight.w100
                ),
                textAlign: TextAlign.center,
            )
        );
    }

    Widget _buildQR(BuildContext context, _ProfilePageViewModel model) {
        return QrImage(
            data: model.attendee.publicId,
            size: MediaQuery
                .of(context)
                .size
                .width * 0.4
        );
    }

    Widget _buildButton(BuildContext context, _ProfilePageViewModel model) {
        return Padding(
            padding: EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),
            child: PillButton(
                color: Constants.csRed,
                onPressed: () =>
                    model.scan(LocalizationService
                        .of(context)
                        .profile['errors']),
                child: Padding(
                    padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
                    child: Text(
                        LocalizationService
                            .of(context)
                            .profile['scan'],
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 20.0
                        )
                    )
                )
            )
        );
    }

    Widget _buildAlertDialog(BuildContext context, _ProfilePageViewModel model) {
        return AlertDialog(
            title: Text(model.errorTitle),
            content: Text(model.errorDescription),
            actions: <Widget>[
                FlatButton(
                    child: Text(
                        'OK',
                        style: TextStyle(
                            color: Colors.red,
                            fontSize: 18.0
                        )
                    ),
                    onPressed: () {
                        Navigator.pop(context);
                        _isErrorDialogOpen = false;
                        model.reset();
                    }
                )
            ]
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _ProfilePageViewModel>(
            converter: (store) => _ProfilePageViewModel.fromStore(store),
            builder: (BuildContext _, _ProfilePageViewModel model) {
                return SingleChildScrollView(
                    padding: EdgeInsets.only(bottom: 10.0),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                            AppTitle(LocalizationService
                                .of(context)
                                .profile['title'], MainAxisAlignment.start),
                            _buildAvatar(context, model),
                            _buildName(model),
                            model.team != null ? _buildTeam(model) : Container(),
                            model.team != null ? _buildSchool(context, model) : Container(),
                            _buildQR(context, model),
                            _buildButton(context, model)
                        ]
                    )
                );
            },
            onDidChange: (model) {
                if (model.isScanned && !model.hasErrors && !_isAttendeeScanned) {
                    _isAttendeeScanned = true;
                    Future.delayed(Duration(seconds: 3), () {
                        _isAttendeeScanned = false;
                    });

                    Scaffold.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                                LocalizationService
                                    .of(context)
                                    .profile['scanned'],
                                style: TextStyle(color: Colors.white)
                            ),
                            action: SnackBarAction(
                                label: 'OK',
                                onPressed: Scaffold
                                    .of(context)
                                    .hideCurrentSnackBar
                            )
                        )
                    );
                }

                if (model.hasErrors && !_isErrorDialogOpen) {
                    _isErrorDialogOpen = true;
                    showDialog(context: context, builder: (_) => _buildAlertDialog(context, model));
                }
            }
        );
    }
}

class _ProfilePageViewModel {
    bool hasErrors;
    bool isScanned;
    String errorTitle;
    String errorDescription;
    Attendee attendee;
    Team team;
    Function scan;
    Function reset;

    _ProfilePageViewModel(this.hasErrors,
        this.isScanned,
        this.errorTitle,
        this.errorDescription,
        this.attendee,
        this.scan,
        this.reset);

    _ProfilePageViewModel.fromStore(Store<AppState> store) {
        hasErrors = store.state.profileState.hasErrors;
        isScanned = store.state.profileState.isScanned;
        errorTitle = store.state.profileState.errorTitle;
        errorDescription = store.state.profileState.errorDescription;
        attendee = store.state.currentAttendee;
        team = store.state.currentTeam;
        scan = (errorMessages) => store.dispatch(ScanAction(errorMessages));
        reset = () => store.dispatch(ResetProfileAction());
    }
}