import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/pages/attendee-retrieval.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/users.service.dart';

class EventPage extends StatefulWidget {
  final EventsService _eventManagementService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final QRCodeReader _qrCodeReader;
  final String _eventId;

  EventPage(this._eventManagementService, this._usersService,
            this._attendeesService, this._qrCodeReader, this._eventId, {Key key})
      : super(key: key);

  @override
  _EventPageState createState() => new _EventPageState(_eventManagementService, _usersService,
                                                       _attendeesService, _qrCodeReader, _eventId);
}

enum EventTabs { Info, Scan, Activities }

class _EventPageState extends State<EventPage> {
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final QRCodeReader _qrCodeReader;
  final String _eventId;
  int _currentTabIndex = 1;

  _EventPageState(this._eventsService, this._usersService,
                  this._attendeesService, this._qrCodeReader, this._eventId);

  Widget _buildBody() {
    Widget body;
    switch (EventTabs.values[_currentTabIndex]) {
      case EventTabs.Scan:
        body = new AttendeeRetrievalPage(_usersService, _attendeesService, _eventsService, _qrCodeReader);
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
    var event = _eventsService.getEventByIdFromCache(_eventId);
    return new Scaffold(
      appBar: new AppBar(title: new Text(event.name)),
      body: _buildBody(),
      bottomNavigationBar: new BottomNavigationBar(
        currentIndex: _currentTabIndex,
        onTap: (tabIndex) => setState(() { _currentTabIndex = tabIndex; }),
        items: _buildTabItems(),
      ),
      resizeToAvoidBottomPadding: false,
    );
  }
}