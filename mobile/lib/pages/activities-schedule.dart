import 'dart:async';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/src/material/scaffold.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/components/activity-card.dart';
import 'package:PolyHxApp/components/circle-gravatar.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/users.service.dart';

class ActivitiesSchedulePage extends StatefulWidget {
  final EventsService _eventsService;
  final AttendeesService _attendeesService;
  final UsersService _usersService;
  final NfcService _nfcService;

  ActivitiesSchedulePage(this._eventsService, this._attendeesService,
                         this._usersService, this._nfcService);

  @override
  State<StatefulWidget> createState() =>
      new _ActivitiesScheduleState(_eventsService, _attendeesService,
                                   _usersService, _nfcService);
}

class _ActivitiesScheduleState extends State<ActivitiesSchedulePage>
    with SingleTickerProviderStateMixin {

  final EventsService _eventsService;
  final AttendeesService _attendeesService;
  final UsersService _usersService;
  final NfcService _nfcService;

  TabController _tabController;
  Map<String, List<Activity>> _activitiesPerDay;
  bool _isLoading = true;

  String _attendeePublicId;
  User _shownUser;


  _ActivitiesScheduleState(this._eventsService, this._attendeesService,
                           this._usersService, this._nfcService) {
    _fetchAllActivities();
  }

  _fetchAllActivities() async {
    setState(() {
      _isLoading = true;
    });
    var activities = await _eventsService.getAllActivities();
    var activitiesPerDay = _getActivitiesPerDay(activities);
    _tabController = new TabController(
        length: activitiesPerDay.keys.length, vsync: this);
    setState(() {
      _activitiesPerDay = activitiesPerDay;
      _isLoading = false;
    });
  }

  Widget _buildAvatar() {
    return new Align(
      alignment: Alignment.topCenter,
      child: new CircleGravatar(_shownUser.username),
    );
  }

  Widget _buildUserDialogBody() {
    return new Padding(
      padding: new EdgeInsets.only(top: 40.0),
      child: new Opacity(
        opacity: 0.75,
        child: new Material(
          elevation: 1.0,
          borderRadius: new BorderRadius.circular(10.0),
          child: new Center(
            child: new Padding(
              padding: new EdgeInsets.only(top: 60.0),
              child: new Text('${_shownUser.firstName} ${_shownUser.lastName}',
                style: new TextStyle(
                  color: Constants.POLYHX_GREY,
                  fontSize: 24.0,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
          ),
        ),
      )
    );
  }

  Widget _buildUserDialog() {
    if (_shownUser == null) {
      return new Container();
    }
    return new Center(
      child: new Container(
        width: 300.0,
        height: 200.0,
        child: new Stack(
          fit: StackFit.expand,
          children: <Widget>[
            _buildUserDialogBody(),
            _buildAvatar(),
          ],
        )
      ),
    );
  }

  _setCurrentAttendee(BuildContext context, String publicId) async {
    if (publicId == _attendeePublicId) {
      return;
    }
    _attendeePublicId = publicId;
    var attendee = await _attendeesService.getAttendeeByPublicId(_attendeePublicId);
    if (attendee == null) {
      return;
    }
    var user = await _usersService.getUser(attendee.userId);
    if (user == null) {
      return;
    }
    new Future.delayed(new Duration(seconds: 2), () {
      if (user == _shownUser) {
        _attendeePublicId = null;
        setState(() {
          _shownUser = null;
        });
      }
    });
    setState(() {
      _shownUser = user;
    });
  }

  Map<String, List<Activity>> _getActivitiesPerDay(List<Activity> activities) {
    var formatter = new DateFormat.MMMMd('en_US');
    Map<String, List<Activity>> dates = {};
    for (var activity in activities) {
      var date = formatter.format(activity.beginDate);
      dates[date] ??= [];
      dates[date].add(activity);
    }
    return dates;
  }

  Widget _buildPage(BuildContext context) {
    return new Stack(
      children: <Widget>[
        new Column(
          children: <Widget> [
            new TabBar(
              labelColor: Colors.black,
              controller: _tabController,
              tabs: _activitiesPerDay.keys.map((d) => new Tab(text: d)).toList(),
            ),
            new Flexible(
              child: new TabBarView(
                controller: _tabController,
                children: _activitiesPerDay.keys.map((d) =>
                new SingleChildScrollView(
                  child: new Column(
                    children: _activitiesPerDay[d].map((a) =>
                    new ActivityCard(a)).toList(),
                  ),
                ),
                ).toList(),
              ),
            ),
          ],
        ),
        _buildUserDialog(),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    _nfcService.NfcStream.asBroadcastStream().listen((id) { _setCurrentAttendee(context, id); });
    return _isLoading
        ? new LoadingSpinner()
        : _buildPage(context);
  }
}