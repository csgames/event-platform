import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/pages/profile.dart';
import 'package:PolyHxApp/redux/actions/activities-schedule-actions.dart';
import 'package:PolyHxApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/pages/activities-schedule.dart';
import 'package:PolyHxApp/pages/attendee-retrieval.dart';
import 'package:PolyHxApp/pages/event-info.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';

class EventPage extends StatefulWidget {
  EventPage({Key key}) : super(key: key);

  @override
  _EventPageState createState() => _EventPageState();
}

enum EventTabs { Info, Scan, Activities, Profile }

class _EventPageState extends State<EventPage> {
  int _currentTabIndex = 0;
  Map<String, dynamic> _values;

  Widget _buildBody(_EventPageViewModel model) {
    Widget body;
    switch (EventTabs.values[_currentTabIndex]) {
      case EventTabs.Scan:
        body = AttendeeRetrievalPage(model.event);
        break;
      case EventTabs.Info:
        body = EventInfoPage();
        break;
      case EventTabs.Activities:
        body = ActivitiesSchedulePage(model.event.id);
        break;
      case EventTabs.Profile:
        body = ProfilePage();
        break;
      default:
        break;
    }
    return body;
  }

  Future<bool> _reset(_EventPageViewModel model) async {
    model.resetAttendeeRetrieval();
    model.resetSchedule();
    return true;
  }

  List<BottomNavigationBarItem> _buildTabItems() {
    return <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: Icon(FontAwesomeIcons.book),
        title: Text(_values['info'])
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.camera_alt),
        title: Text(_values['register'])
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.event),
        title: Text(_values['activities'])
      ),
      BottomNavigationBarItem(
        icon: Icon(FontAwesomeIcons.userAlt),
        title: Text(_values['profile'])
      )
    ];
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _EventPageViewModel>(
      onInit: (_) => _values = LocalizationService.of(context).event,
      converter: (store) => _EventPageViewModel.fromStore(store),
      builder: (BuildContext context, _EventPageViewModel model) {
        return WillPopScope(
          onWillPop: () => _reset(model),
          child: Scaffold(
            appBar: AppBar(title: Text(model.event.name)),
            body: _buildBody(model),
            resizeToAvoidBottomPadding: false,
            bottomNavigationBar: BottomNavigationBar(
              fixedColor: Constants.polyhxRed,
              type: BottomNavigationBarType.fixed,
              currentIndex: _currentTabIndex,
              items: _buildTabItems(),
              onTap: (tabIndex) => setState(() => _currentTabIndex = tabIndex)
            )
          )
        );
      }
    );
  }
}

class _EventPageViewModel {
  Event event;
  Function resetSchedule;
  Function resetAttendeeRetrieval;

  _EventPageViewModel(this.event, this.resetSchedule, this.resetAttendeeRetrieval);

  _EventPageViewModel.fromStore(Store<AppState> store) {
    event = store.state.currentEvent;
    resetSchedule = () => store.dispatch(ResetScheduleAction());
    resetAttendeeRetrieval = () => store.dispatch(ResetAction());
  }
}