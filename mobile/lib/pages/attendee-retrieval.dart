import 'package:PolyHxApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/components/pill-textfield.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/pages/attendee-profile.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:redux/redux.dart';

class AttendeeRetrievalPage extends StatefulWidget {
  final Event _event;

  AttendeeRetrievalPage(this._event);

  @override
  _AttendeeRetrievalPageState createState() => _AttendeeRetrievalPageState(_event);
}

class _AttendeeRetrievalPageState extends State<AttendeeRetrievalPage> {
  static const platform = const MethodChannel('app.polyhx.io/nfc');

  final Event _event;
  Map<String, dynamic> _values;
  bool _isErrorDialogOpen = false;
  bool _isSnackBarOpen = false;
  bool _isInit = false;
  bool _isAttendeeUpdated = false;

  _AttendeeRetrievalPageState(this._event);

  Widget _buildAlertDialog(_AttendeeRetrievalViewModel model) {
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


  Widget _buildSearchBar(_AttendeeRetrievalViewModel model) {
    return Padding(
      padding: EdgeInsets.all(20.0),
      child: PillTextField(
        keyboardType: TextInputType.emailAddress,
        onSubmitted: (username) => model.search(username, _event, _values['errors']),
        decoration: InputDecoration(
          prefixIcon: Icon(
            Icons.search,
            color: Constants.polyhxRed
          ),
          border: InputBorder.none
        )
      )
    );
  }

  Widget _buildNoAttendeeBody(_AttendeeRetrievalViewModel model) {
    return model.isLoading
      ? Expanded(child: LoadingSpinner())
      : Expanded(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(Icons.person,
              size: 240.0,
              color: Constants.polyhxGrey.withAlpha(144),
            ),
            Text(
              _values['register'],
              style: TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.w900,
                color: Constants.polyhxGrey.withAlpha(144),
                fontFamily: 'Raleway'
              )
            )
          ]
        )
      );
  }

  Widget _buildScanButton(_AttendeeRetrievalViewModel model) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 50.0),
      child: Align(
        alignment: Alignment.bottomCenter,
        child: PillButton(
          child: Padding(
            padding: EdgeInsets.fromLTRB(35.0, 10.0, 35.0, 10.0),
            child: Icon(
              Icons.camera_alt,
              color: Colors.white,
              size: 40.0
            )
          ),
          enabled: !model.isLoading,
          onPressed: () => model.scan(_event, _values['errors'])
        )
      )
    );
  }

  Widget _buildAttendeeProfile(_AttendeeRetrievalViewModel model) {
    return Padding(
      padding: EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 20.0),
      child: AttendeeProfilePage(
        model.attendee,
        model.user,
        _event.getRegistrationStatus(model.attendee.id),
        model.isScanned && !model.hasErrors && model.idSaved && model.statusSaved,
        LocalizationService.of(context).attendeeProfile,
        onDone: () {
          model.reset();
          _isInit = false;
        },
        onCancel: () {
          model.reset();
          _isInit = false;
        }
      )
    );
  }

  Widget _buildPage(BuildContext context, _AttendeeRetrievalViewModel model) {
    return model.attendee != null && model.user != null
      ? _buildAttendeeProfile(model)
      : Column(
        children: <Widget>[
          _buildSearchBar(model),
          _buildNoAttendeeBody(model),
          _buildScanButton(model)
        ]
      );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _AttendeeRetrievalViewModel>(
      onInit: (_) => _values = LocalizationService.of(context).attendeeRetrieval,
      converter: (store) => _AttendeeRetrievalViewModel.fromStore(store),
      builder: (context, model) => Center(child: _buildPage(context, model)),
      onDidChange: (model) {
        if (model.isScanned && !model.hasErrors && !_isAttendeeUpdated) {
          _isAttendeeUpdated = true;
          Future.delayed(Duration(seconds: 5), () {
            _isAttendeeUpdated = false;
          });
          Scaffold.of(context).showSnackBar(
            SnackBar(
              content: model.idSaved && model.statusSaved
                ? Text(
                  _values['saved'],
                  style: TextStyle(color: Colors.white)
                )
                : Text(
                  _values['errors']['save'],
                  style: TextStyle(color: Colors.red)
                ),
              action: SnackBarAction(
                label: 'OK',
                onPressed: Scaffold.of(context).hideCurrentSnackBar
              )
            )
          );
        }

        if (model.hasErrors && model.errorTitle != '' && model.errorDescription != '' && !_isErrorDialogOpen) {
          _isErrorDialogOpen = true;
          showDialog(context: context, builder: (_) => _buildAlertDialog(model));
        }

        if (model.user != null && model.attendee != null && !_isInit) {
          _isInit = true;
          model.init();
        }

        if (model.hasErrors && model.isScanned && !_isSnackBarOpen) {
          _isSnackBarOpen = true;
          model.init();
          Future.delayed(Duration(seconds: 2), () {
            model.clean(model.attendee, model.user);
            _isSnackBarOpen = false;
          });

          Scaffold.of(context).showSnackBar(
            SnackBar(
              content: Text(
                _values['errors']['tag'],
                style: TextStyle(color: Colors.white)
              ),
              action: SnackBarAction(
                label: 'OK',
                onPressed: Scaffold.of(context).hideCurrentSnackBar
              )
            )
          );
        }
      }
    );
  }
}

class _AttendeeRetrievalViewModel {
  bool isLoading;
  bool hasErrors;
  bool isScanned;
  bool idSaved;
  bool statusSaved;
  String errorTitle;
  String errorDescription;
  Attendee attendee;
  User user;
  Function init;
  Function search;
  Function scan;
  Function reset;
  Function clean;

  _AttendeeRetrievalViewModel(
    this.isLoading,
    this.hasErrors,
    this.isScanned,
    this.idSaved,
    this.statusSaved,
    this.errorTitle,
    this.errorDescription,
    this.attendee,
    this.user,
    this.init,
    this.search,
    this.scan,
    this.reset,
    this.clean
  );

  _AttendeeRetrievalViewModel.fromStore(Store<AppState> store) {
    isLoading = store.state.attendeeRetrievalState.isLoading;
    hasErrors = store.state.attendeeRetrievalState.hasErrors;
    isScanned = store.state.attendeeRetrievalState.isScanned;
    idSaved = store.state.attendeeRetrievalState.idSaved;
    statusSaved = store.state.attendeeRetrievalState.statusSaved;
    errorTitle = store.state.attendeeRetrievalState.errorTitle;
    errorDescription = store.state.attendeeRetrievalState.errorDescription;
    attendee = store.state.attendeeRetrievalState.attendee;
    user = store.state.attendeeRetrievalState.user;
    init = () => store.dispatch(InitAction());
    search = (username, event, errorMessages) => store.dispatch(SearchAction(username, event, errorMessages));
    scan = (event, errorMessages) => store.dispatch(ScanAction(event, errorMessages));
    reset = () => store.dispatch(ResetAttendeeAction());
    clean = (attendee, user) => store.dispatch(CleanAction(attendee, user));  
  }
}