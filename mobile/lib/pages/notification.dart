import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/redux/actions/activities-schedule-actions.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';

class NotificationPage extends StatefulWidget {
    @override
    _NotificationPageState createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
    String _smsBody;
    String _pushBody;
    String _pushTitle;
    Activity _activity;
    List<Activity> _activities;
    final TextEditingController _controllerSms = TextEditingController();
    final TextEditingController _controllerPushTitle = TextEditingController();
    final TextEditingController _controllerPushBody = TextEditingController();
    bool _isSnackBarOpen = false;

    Widget _buildTitle(BuildContext context, String title) {
        return Padding(
            padding: EdgeInsets.only(left: 20.0),
            child: Text(
                title,
                style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 30.0
                )
            )
        );
    }

    Widget _buildSmsTextField(BuildContext context, _NotificationViewModel model) {
        return Padding(
            padding: EdgeInsets.all(15.0),
            child: TextField(
                maxLines: null,
                keyboardType: TextInputType.multiline,
                decoration: InputDecoration(labelText: LocalizationService
                    .of(context)
                    .notification['sms-text']),
                onChanged: (_val) {
                    _smsBody = _val;
                    if (model.smsSent && _smsBody != '') {
                        model.reset();
                    }
                },
                controller: _controllerSms
            )
        );
    }

    Widget _buildPushTitleTextField(BuildContext context, _NotificationViewModel model) {
        return Padding(
            padding: EdgeInsets.all(15.0),
            child: TextField(
                maxLines: null,
                keyboardType: TextInputType.multiline,
                decoration: InputDecoration(labelText: LocalizationService
                    .of(context)
                    .notification['push-title']),
                onChanged: (_val) {
                    _pushTitle = _val;
                    if (model.pushSent && _pushTitle != '') {
                        model.reset();
                    }
                },
                controller: _controllerPushTitle
            )
        );
    }

    Widget _buildPushBodyTextField(BuildContext context, _NotificationViewModel model) {
        return Padding(
            padding: EdgeInsets.all(15.0),
            child: TextField(
                maxLines: null,
                keyboardType: TextInputType.multiline,
                decoration: InputDecoration(labelText: LocalizationService
                    .of(context)
                    .notification['push-text']),
                onChanged: (_val) {
                    _pushBody = _val;
                    if (model.pushSent && _pushBody != '') {
                        model.reset();
                    }
                },
                controller: _controllerPushBody
            )
        );
    }

    Widget _buildSendButton(BuildContext context, VoidCallback onPressed) {
        return Center(
            child: PillButton(
                color: Constants.csBlue,
                onPressed: onPressed,
                child: Padding(
                    padding: EdgeInsets.fromLTRB(25.0, 12.5, 25.0, 12.5),
                    child: Text(
                        LocalizationService
                            .of(context)
                            .notification['send'],
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

    Widget _buildDropDown(BuildContext context) {
        return Center(
            child: DropdownButton<String>(
                hint: Text(_activity != null && _activity.name != null ? _activity.name[LocalizationService
                                    .of(context)
                                    .language] : ''),
                items: _activities.map((Activity value) {
                    return DropdownMenuItem<String>(
                        value: value.name[LocalizationService
                                    .of(context)
                                    .language],
                        child: Text(
                            value.name[LocalizationService
                                    .of(context)
                                    .language],
                            style: TextStyle(fontFamily: 'Montserrat')
                        )
                    );
                }).toList(),
                onChanged: (_val) {
                    for (Activity a in _activities) {
                        if (a.name[LocalizationService.of(context).language] == _val) _activity = a;
                    }
                    setState(() {});
                }
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _NotificationViewModel>(
            onInit: (store) {
                LoadActivitiesScheduleAction action = LoadActivitiesScheduleAction(LocalizationService
                    .of(context)
                    .code);
                store.dispatch(action);
                action.completer.future.then((activities) {
                    _activities = activities;
                    _activities.insert(0, Activity(name: {"en": 'Event', "fr": "Event"}));
                });
            },
            converter: (store) => _NotificationViewModel.fromStore(store),
            builder: (BuildContext _, _NotificationViewModel model) {
                return SingleChildScrollView(
                    padding: EdgeInsets.only(bottom: 7.0),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                            AppTitle(LocalizationService
                                .of(context)
                                .notification['title'], MainAxisAlignment.start),
                            Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                    _buildTitle(context, LocalizationService
                                        .of(context)
                                        .notification['sms']),
                                    model.smsSent == true ? Padding(
                                        padding: EdgeInsets.only(right: 20.0),
                                        child: Icon(
                                            FontAwesomeIcons.checkCircle,
                                            color: Colors.green,
                                        )
                                    ) : Container()
                                ]
                            ),
                            _buildSmsTextField(context, model),
                            _buildSendButton(context, () {
                                if (_smsBody != '') model.sendSms(_smsBody);
                            }),
                            Padding(
                                padding: EdgeInsets.only(top: 20.0),
                                child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: <Widget>[
                                        _buildTitle(context, LocalizationService
                                            .of(context)
                                            .notification['push']),
                                        model.pushSent == true ? Padding(
                                            padding: EdgeInsets.only(right: 20.0),
                                            child: Icon(
                                                FontAwesomeIcons.checkCircle,
                                                color: Colors.green,
                                            )
                                        ) : Container()
                                    ]
                                )
                            ),
                            _buildPushTitleTextField(context, model),
                            _buildPushBodyTextField(context, model),
                            _activities != null ? _buildDropDown(context) : Container(),
                            _buildSendButton(context, () {
                                if (_pushBody != '' && _pushTitle != '' && _activity != null) model.sendPush(_pushTitle, _pushBody, _activity);
                            })
                        ]
                    )
                );
            },
            onDidChange: (model) {
                if (model.smsSent == true) {
                    _smsBody = '';
                    _controllerSms.clear();
                    FocusScope.of(context).requestFocus(FocusNode());
                }

                if (model.pushSent == true) {
                    _pushBody = '';
                    _pushTitle = '';
                    _activity = null;
                    _controllerPushTitle.clear();
                    _controllerPushBody.clear();
                    FocusScope.of(context).requestFocus(FocusNode());
                }

                if (model.hasErrors && model.error != null && !_isSnackBarOpen) {
                    _isSnackBarOpen = true;
                    Future.delayed(Duration(seconds: 2), () {
                        _isSnackBarOpen = false;
                    });

                    Scaffold.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                                model.error,
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
            }
        );
    }
}

class _NotificationViewModel {
    bool smsSent;
    bool pushSent;
    bool hasErrors;
    dynamic error;
    Function sendSms;
    Function sendPush;
    Function reset;


    _NotificationViewModel.fromStore(Store<AppState> store) {
        smsSent = store.state.notificationState.smsSent;
        pushSent = store.state.notificationState.pushSent;
        hasErrors = store.state.notificationState.hasErrors;
        error = store.state.notificationState.notificationError;
        sendSms = (message) => store.dispatch(SendSmsAction(store.state.currentEvent.id, message));
        sendPush = (title, body, activity) => store.dispatch(SendPushAction(store.state.currentEvent.id, title, body, activity));
        reset = () => store.dispatch(ResetNotificationsAction());
    }
}