import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/components/activity-card.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/pages/activity.dart';
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


  _ActivitiesScheduleState(this._eventsService, this._attendeesService,
                           this._usersService, this._nfcService) {
    _fetchAllActivities();
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

  _fetchAllActivities() async {
    setState(() {
      _isLoading = true;
    });
    var activities = await _eventsService.getAllActivities();
    var activitiesPerDay = _getActivitiesPerDay(activities);
    _tabController = new TabController(
        length: activitiesPerDay.keys.length,
        vsync: this
    );
    setState(() {
      _activitiesPerDay = activitiesPerDay;
      _isLoading = false;
    });
  }

  void _showActivity(BuildContext context, Activity activity) {
    Navigator.of(context).push(new MaterialPageRoute<Null>(
        builder: (BuildContext context) {
          return new ActivityPage(_eventsService, _usersService,
                                  _attendeesService, _nfcService, activity);
        },
        fullscreenDialog: true
    ));
  }

  Widget _buildActivitiesList(BuildContext context) {
    return new Column(
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
                new FlatButton(child: new ActivityCard(a),
                    onPressed: () { _showActivity(context, a); })
                ).toList(),
              ),
            ),
            ).toList(),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? new LoadingSpinner()
        : _buildActivitiesList(context);
  }
}