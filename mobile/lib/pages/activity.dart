import 'dart:async';
import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/redux/actions/activity-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:CSGamesApp/components/user-profile.dart';
import 'package:CSGamesApp/domain/activity.dart';
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
    bool _isErrorDialogOpen = false;
    bool _isScannedDialogOpen = false;

    _ActivityPageState(this._activity);

    Widget _buildUserDialog(Attendee attendee, bool isAlreadyAttending) {
        return Center(
            child: Container(
                width: 300.0,
                height: 250.0,
                child: UserProfile(
                    attendee,
                    opacity: 0.9,
                    content: Padding(
                        padding: EdgeInsets.only(top: 20.0),
                        child: Text(
                            isAlreadyAttending
                                ? LocalizationService.of(context).activity['already']
                                : LocalizationService.of(context).activity['signed'],
                            style: TextStyle(
                                color: isAlreadyAttending ? Colors.red : Colors.green,
                                fontWeight: FontWeight.w700,
                                fontSize: 24.0,
                                fontFamily: 'OpenSans'
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
                        LocalizationService.of(context).activity['scan'],
                        style: TextStyle(
                            fontSize: 30.0,
                            fontWeight: FontWeight.w900,
                            color: Constants.polyhxGrey.withAlpha(144),
                            fontFamily: 'OpenSans'
                        )
                    )
                ]
            )
        );
    }

    Widget _buildAttendeeCountWidget() {
        return Column(
            children: <Widget>[
                Padding(
                    padding: EdgeInsets.only(top: 30.0),
                    child: Text(
                        LocalizationService.of(context).activity['count'],
                        style: TextStyle(
                            color: Constants.polyhxGrey.withAlpha(200),
                            fontSize: 34.0,
                            fontWeight: FontWeight.w900,
                            fontFamily: 'OpenSans'
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
                            fontWeight: FontWeight.w900,
                            fontFamily: 'Raleway'
                        )
                    )
                )
            ]
        );
    }

    Widget _buildBody(_ActivityPageViewModel model) {
        return Center(
            child: Column(
                children: <Widget>[
                    _buildAttendeeCountWidget(),
                    _buildBackground()
                ]
            )
        );
    }

    Future<bool> _pop(_ActivityPageViewModel model) async {
        model.pop();
        return true;
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _ActivityPageViewModel>(
            onInit: (store) {
                store.dispatch(InitAction(_activity.id, LocalizationService.of(context).activity['errors']));
                store.dispatch(GetCurrentActivity(_activity.id));
            },
            converter: (store) => _ActivityPageViewModel.fromStore(store),
            builder: (BuildContext context, _ActivityPageViewModel model) {
                return WillPopScope(
                    onWillPop: () => _pop(model),
                    child: Scaffold(
                        appBar: AppBar(
                            title: Text(
                                _activity.name[LocalizationService
                                        .of(context)
                                        .language],
                                style: TextStyle(fontFamily: 'Raleway')
                            ),
                            backgroundColor: Constants.csBlue
                        ),
                        body: model.isLoading ? LoadingSpinner() : _buildBody(model),
                        resizeToAvoidBottomPadding: false
                    )
                );
            },
            onDidChange: (_ActivityPageViewModel model) {
                if (model.activity != null) {
                    setState(() {
                        this._activity = model.activity;
                    });
                }

                if (model.hasErrors && model.errorContent != null && !_isErrorDialogOpen) {
                    _isErrorDialogOpen = true;
                    showDialog(context: context, builder: (_) => _buildTagNotBoundDialog(model), barrierDismissible: false);
                }

                if (model.isScanned && !_isScannedDialogOpen) {
                    _isScannedDialogOpen = true;
                    if (model.activity != null) {
                        setState(() {
                            this._activity = model.activity;
                        });
                    }
                    Future.delayed(Duration(seconds: 1), () {
                        model.reset();
                        Navigator.pop(context);
                        _isScannedDialogOpen = false;
                    });
                    showDialog(context: context, builder: (_) => _buildUserDialog(model.attendee, model.activity == null));
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
    Attendee attendee;
    Activity activity;
    Function reset;
    Function init;
    Function pop;

    _ActivityPageViewModel(this.isLoading,
        this.hasErrors,
        this.isScanned,
        this.errorTitle,
        this.errorContent,
        this.attendee,
        this.activity,
        this.reset,
        this.init,
        this.pop
    );

    _ActivityPageViewModel.fromStore(Store<AppState> store) {
        isLoading = store.state.activityState.isLoading;
        hasErrors = store.state.activityState.hasErrors;
        isScanned = store.state.activityState.isScanned;
        errorTitle = store.state.activityState.errorTitle;
        errorContent = store.state.activityState.errorContent;
        attendee = store.state.activityState.attendee;
        activity = store.state.activityState.activity;
        reset = () => store.dispatch(ResetActivity());
        init = (id, errorMessages) => store.dispatch(InitAction(id, errorMessages));
        pop = () => store.dispatch(PopAction());
    }
}