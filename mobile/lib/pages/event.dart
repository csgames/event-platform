import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qr_reader/qr_reader.dart';
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
      _EventPageState(_eventsService, _usersService,
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
        body = AttendeeRetrievalPage(_eventsService, _usersService,
            _attendeesService, _nfcService, _qrCodeReader,
            event);
        break;
      case EventTabs.Info:
        body = EventInfoPage();
        break;
      case EventTabs.Activities:
        body = ActivitiesSchedulePage(_eventsService, _attendeesService, _usersService, _nfcService);
        break;
      default:
        break;
    }
    return body;
  }

  List<BottomNavigationBarItem> _buildTabItems() {
    return <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: Icon(Icons.info_outline),
        title: Text('Info'),
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.camera_alt),
        title: Text('Register'),
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.event),
        title: Text('Activities'),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, Event>(
        converter: (Store<AppState> store) => store.state.currentEvent,
        builder: (BuildContext context, Event event) {
          return Scaffold(
            appBar: AppBar(title: Text(event.name)),
            body: _buildBody(event),
            bottomNavigationBar: BottomNavigationBar(
              fixedColor: Constants.polyhxRed,
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
