import 'dart:async';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/redux/actions/activity-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/components/user-profile.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class ActivityPage extends StatefulWidget {
  final Activity _activity;

  ActivityPage(this._activity);

  @override
  State<StatefulWidget> createState() => _ActivityPageState(_activity);
}

class _ActivityPageState extends State<ActivityPage> {
  Activity _activity;
  Map<String, dynamic> _values;
  bool _isRaffleDialogOpen = false;
  bool _isErrorDialogOpen = false;
  bool _isScannedDialogOpen = false;

  _ActivityPageState(this._activity);

  Widget _buildUserDialog(User user, bool isAlreadyAttending) {
    return Center(
      child: Container(
        width: 300.0,
        height: 250.0,
        child: UserProfile(
          user,
          opacity: 0.9,
          content: Padding(
            padding: EdgeInsets.only(top: 20.0),
            child: Text(
              isAlreadyAttending ? _values['already'] : _values['signed'],
              style: TextStyle(
                color: isAlreadyAttending ? Colors.red : Colors.green,
                fontWeight: FontWeight.w700,
                fontSize: 24.0,
              )
            )
          )
        )
      )
    );
  }

  Widget _buildTagNotBoundDialog(_ActivityPageViewModel model) {
    return AlertDialog(
      title: Text(model.errorTitle),
      content: Text(model.errorContent),
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
            model.reset();
            _isErrorDialogOpen = false;
          }
        )
      ]
    );
  }

  Widget _buildWinnerDialog(_ActivityPageViewModel model) {
    return Center(
      child: Container(
        width: 300.0,
        height: 300.0,
        child: UserProfile(
          model.winner,
          opacity: 0.85,
          content: Padding(
            padding: EdgeInsets.symmetric(vertical: 10.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(bottom: 20.0),
                  child: Text(
                    _values['winner'],
                    style: TextStyle(
                      color: Colors.lightBlue,
                      fontWeight: FontWeight.w700,
                      fontSize: 28.0
                    )
                  )
                ),
                PillButton(
                  onPressed: () {
                    Navigator.pop(context);
                    model.reset();
                    _isRaffleDialogOpen = false;
                  },
                  child: Padding(
                    padding: EdgeInsets.fromLTRB(25.0, 12.5, 25.0, 12.5),
                    child: Text(
                      _values['done'],
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20.0
                      )
                    )
                  )
                )
              ]
            )
          )
        )
      )
    );
  }

  Widget _buildBackground() {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(
            Icons.nfc,
            size: 240.0,
            color: Constants.polyhxGrey.withAlpha(144)
          ),
          Text(
            _values['scan'],
            style: TextStyle(
              fontSize: 30.0,
              fontWeight: FontWeight.w900,
              color: Constants.polyhxGrey.withAlpha(144)
            )
          )
        ]
      )
    );
  }

  Widget _buildRaffleButton(_ActivityPageViewModel model) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 50.0),
      child: Align(
        alignment: Alignment.bottomCenter,
        child: PillButton(
          onPressed: () => model.raffle(_activity.id),
          child: Padding(
            padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
            child: Text(
              _values['raffle'],
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 20.0
              ),
            )
          )
        )
      )
    );
  }

  Widget _buildAttendeeCountWidget() {
    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(top: 30.0),
          child: Text(
            _values['count'],
            style: TextStyle(
              color: Constants.polyhxGrey.withAlpha(200),
              fontSize: 34.0,
              fontWeight: FontWeight.w900
            )
          )
        ),
        Padding(
          padding: EdgeInsets.only(top: 10.0),
          child: Text(
            _activity.attendees?.length?.toString() ?? '0',
            style: TextStyle(
              color: Constants.polyhxGrey.withAlpha(200),
              fontSize: 34.0,
              fontWeight: FontWeight.w900
            )
          )
        )
      ]
    );
  }

  Widget _buildBody( _ActivityPageViewModel model) {
    return Center(
      child: Column(
        children: <Widget>[
          _buildAttendeeCountWidget(),
          _buildBackground(),
          _buildRaffleButton(model)
        ]
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _ActivityPageViewModel>(
      onInit: (store) {
        _values = LocalizationService.of(context).activity;
        store.dispatch(InitAction(_activity.id, _values['errors']));
      },
      converter: (store) => _ActivityPageViewModel.fromStore(store),
      builder: (BuildContext context, _ActivityPageViewModel model) {
        return Scaffold(
            appBar: AppBar(
              title: Text(_activity.name)
            ),
            body: model.isLoading ? LoadingSpinner() : _buildBody(model),
            resizeToAvoidBottomPadding: false
          );
      },
      onDidChange: (_ActivityPageViewModel model) {
        if (model.winner != null && model.winner.username != null && !_isRaffleDialogOpen) {
          _isRaffleDialogOpen = true;
          showDialog(context: context, builder: (_) => _buildWinnerDialog(model), barrierDismissible: false);
        }

        if (model.hasErrors && model.errorContent != null && !_isErrorDialogOpen) {
          _isErrorDialogOpen = true;
          showDialog(context: context, builder: (_) => _buildTagNotBoundDialog(model), barrierDismissible: false);
          model.init(_activity.id, _values['errors']);
        }

        if (model.isScanned && !_isScannedDialogOpen) {
          _isScannedDialogOpen = true;
          if (model.activity != null) {
            setState(() {
              this._activity = model.activity;
            });
          }
          model.init(_activity.id, _values['errors']);
          Future.delayed(Duration(seconds: 2), () {
            Navigator.pop(context);
            model.reset();
            _isScannedDialogOpen = false;
          });
          showDialog(context: context, builder: (_) => _buildUserDialog(model.user, model.activity == null));
        }
      }
    );
  }
}

class _ActivityPageViewModel {
  bool isLoading;
  bool hasErrors;
  bool isScanned;
  String errorTitle;
  String errorContent;
  User winner;
  User user;
  Activity activity;
  Function raffle;
  Function reset;
  Function init;

  _ActivityPageViewModel(
    this.isLoading,
    this.hasErrors,
    this.isScanned,
    this.errorTitle,
    this.errorContent,
    this.winner,
    this.user,
    this.activity,
    this.raffle,
    this.reset,
    this.init
  );

  _ActivityPageViewModel.fromStore(Store<AppState> store) {
    isLoading = store.state.activityState.isLoading;
    hasErrors = store.state.activityState.hasErrors;
    isScanned = store.state.activityState.isScanned;
    errorTitle = store.state.activityState.errorTitle;
    errorContent = store.state.activityState.errorContent;
    winner = store.state.activityState.winner;
    user = store.state.activityState.user;
    activity = store.state.activityState.activity;
    raffle = (id) => store.dispatch(RaffleAction(id));
    reset = () => store.dispatch(ResetActivity());
    init = (id, errorMessages) => store.dispatch(InitAction(id, errorMessages));
  }
}