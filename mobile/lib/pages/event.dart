import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:redux/redux.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/pages/activities-schedule.dart';
import 'package:PolyHxApp/pages/attendee-retrieval.dart';
import 'package:PolyHxApp/pages/event-info.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:PolyHxApp/utils/constants.dart';

class EventPage extends StatefulWidget {
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final NfcService _nfcService;
  final QRCodeReader _qrCodeReader;

  EventPage(this._eventsService, this._usersService,
      this._attendeesService, this._nfcService, this._qrCodeReader, {Key key})
      : super(key: key);

  @override
  _EventPageState createState() =>
      new _EventPageState(_eventsService, _usersService,
          _attendeesService, _nfcService, _qrCodeReader);
}

enum EventTabs { Info, Scan, Activities }

class _EventPageState extends State<EventPage> {
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final NfcService _nfcService;
  final QRCodeReader _qrCodeReader;
  int _currentTabIndex = 0;

  _EventPageState(this._eventsService, this._usersService,
      this._attendeesService, this._nfcService, this._qrCodeReader);

  Widget _buildBody(Event event) {
    Widget body;
    switch (EventTabs.values[_currentTabIndex]) {
      case EventTabs.Scan:
        body = new AttendeeRetrievalPage(_eventsService, _usersService,
            _attendeesService, _nfcService, _qrCodeReader,
            event);
        break;
      case EventTabs.Info:
        body = new EventInfoPage();
        break;
      case EventTabs.Activities:
        body = new ActivitiesSchedulePage(_eventsService, _attendeesService, _usersService, _nfcService);
        break;
      default:
        break;
    }
    return body;
  }

  List<BottomNavigationBarItem> _buildTabItems() {
    return <BottomNavigationBarItem>[
      new BottomNavigationBarItem(
        icon: new Icon(Icons.info_outline),
        title: new Text('Info'),
      ),
      new BottomNavigationBarItem(
        icon: new Icon(Icons.camera_alt),
        title: new Text('Register'),
      ),
      new BottomNavigationBarItem(
        icon: new Icon(Icons.event),
        title: new Text('Activities'),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, Event>(
        converter: (Store<AppState> store) => store.state.currentEvent,
        builder: (BuildContext context, Event event) {
          return new Scaffold(
            appBar: new AppBar(title: new Text(event.name)),
            body: _buildBody(event),
            bottomNavigationBar: new BottomNavigationBar(
              fixedColor: Constants.POLYHX_RED,
              type: BottomNavigationBarType.fixed,
              currentIndex: _currentTabIndex,
              onTap: (tabIndex) =>
                  setState(() {
                    _currentTabIndex = tabIndex;
                  }),
              items: _buildTabItems(),
            ),
            resizeToAvoidBottomPadding: false,
          );
        }
    );
  }
}
