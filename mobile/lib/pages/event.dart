import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/pages/activities-schedule.dart';
import 'package:PolyHxApp/pages/event-info.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/pages/attendee-retrieval.dart';
import 'package:PolyHxApp/services/event-management.dart';
import 'package:redux/redux.dart';

class EventPage extends StatefulWidget {
  final EventManagementService _eventManagementService;
  final QRCodeReader _qrCodeReader;

  EventPage(this._eventManagementService, this._qrCodeReader, {Key key})
      : super(key: key);

  @override
  _EventPageState createState() =>
      new _EventPageState(_eventManagementService, _qrCodeReader);
}

enum EventTabs { Info, Scan, Activities }

class _EventPageState extends State<EventPage> {
  final EventManagementService _eventManagementService;
  final QRCodeReader _qrCodeReader;
  int _currentTabIndex = 0;

  _EventPageState(this._eventManagementService, this._qrCodeReader);

  Widget _buildBody() {
    Widget body;
    switch (EventTabs.values[_currentTabIndex]) {
      case EventTabs.Scan:
        body = new AttendeeRetrievalPage(_qrCodeReader);
        break;
      case EventTabs.Info:
        body = new EventInfoPage();
        break;
      case EventTabs.Activities:
        body = new ActivitiesSchedulePage(_eventManagementService);
        break;
      default:
        break;
    }
    return body;
  }

  List<BottomNavigationBarItem> _buildTabItems() {
    final textStyle = new TextStyle(color: Colors.white);
    return <BottomNavigationBarItem>[
      new BottomNavigationBarItem(
        backgroundColor: Constants.POLYHX_RED,
        icon: new Icon(Icons.info_outline, color: Colors.white),
        title: new Text('Info', style: textStyle),
      ),
      new BottomNavigationBarItem(
        backgroundColor: Constants.POLYHX_RED,
        icon: new Icon(Icons.camera_alt, color: Colors.white),
        title: new Text('Register', style: textStyle),
      ),
      new BottomNavigationBarItem(
        backgroundColor: Constants.POLYHX_RED,
        icon: new Icon(Icons.event, color: Colors.white),
        title: new Text('Activities', style: textStyle),
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
            body: _buildBody(),
            bottomNavigationBar: new BottomNavigationBar(
              fixedColor: Constants.POLYHX_RED,
              type: BottomNavigationBarType.shifting,
              currentIndex: _currentTabIndex,
              onTap: (tabIndex) =>
                  setState(() {
                    _currentTabIndex = tabIndex;
                  }),
              items: _buildTabItems(),
            ),
            resizeToAvoidBottomPadding: false,
          );
        });
  }
}
