import 'dart:async';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/src/material/scaffold.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/components/loadingspinner.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/services/events.service.dart';

class ActivitiesSchedulePage extends StatefulWidget {
  final EventsService _eventsService;

  ActivitiesSchedulePage(this._eventsService);

  @override
  State<StatefulWidget> createState() =>
      new _ActivitiesScheduleState(_eventsService);
}

class _ActivitiesScheduleState extends State<ActivitiesSchedulePage>
    with SingleTickerProviderStateMixin {

  final EventsService _eventsService;
  TabController _tabController;

  _ActivitiesScheduleState(this._eventsService) {

  }

  Future<List<Activity>> fetchAllActivities() {
    return _eventsService.getAllActivities();
  }

  Widget _buildActivityCard(Activity a) {
    var formatter = new DateFormat.Hm('en_US');
    var beginHour = formatter.format(a.beginDate);
    var endHour = formatter.format(a.endDate);
    return new Container(
        margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
        child: new Material(
            elevation: 3.0,
            child: new Row(
                children: <Widget>[
                  new Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: new Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            new Text(a.name,
                                style: new TextStyle(
                                    fontSize: 20.0
                                )
                            ),
                            new Padding(
                                padding: const EdgeInsets.fromLTRB(0.0, 3.0, 0.0, 0.0),
                                child: new Text("$beginHour - $endHour",
                                    style: new TextStyle(
                                        fontSize: 15.0
                                    )
                                )
                            )
                          ]
                      )
                  )
                ])
        )
    );
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

  @override
  Widget build(BuildContext context) {
    return new FutureBuilder(
        future: fetchAllActivities(),
        builder: (BuildContext context,
            AsyncSnapshot<List<Activity>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return new Scaffold(body: new Center(child: new LoadingSpinner()));
          } else {
            if (!snapshot.hasError && snapshot.data != null) {
              var activitiesPerDay = _getActivitiesPerDay(snapshot.data);
              if (_tabController != null) {
                _tabController.dispose();
              }
              _tabController = new TabController(
                  length: activitiesPerDay.keys.length, vsync: this);
              var tabBar = new TabBar(
                  labelColor: Colors.black,
                  controller: _tabController,
                  tabs: activitiesPerDay.keys.map((d) => new Tab(text: d))
                      .toList()
              );

              return new Column(
                children: [
                  tabBar,
                  new Flexible(
                      child: new TabBarView(
                          controller: _tabController,
                          children: activitiesPerDay.keys.map((d) =>
                          new SingleChildScrollView(
                              child:
                              new Column(
                                  children: activitiesPerDay[d].map((a) =>
                                      _buildActivityCard(a)).toList()
                              ))).toList()
                      )
                  )
                ],
              );
            } else {
              return new Scaffold(body: new Center(child: new Text("Error")));
            }
          }
        });
  }
}