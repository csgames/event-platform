import 'package:CSGamesApp/components/activity-card.dart';
import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/components/time-card.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/pages/activity.dart';
import 'package:CSGamesApp/redux/actions/activities-schedule-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/states/activities-schedule-state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/services/schedule.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ActivitiesSchedulePage extends StatefulWidget {
    final String _userRole;

    ActivitiesSchedulePage(this._userRole);

    @override
    State<StatefulWidget> createState() => _ActivitiesScheduleState(this._userRole);
}

class _ActivitiesScheduleState extends State<ActivitiesSchedulePage> with TickerProviderStateMixin {
    String _userRole;
    TabController _tabController;
    Map<String, Map<String, List<Activity>>> _activities;
    int currentTabIndex = 0;

    _ActivitiesScheduleState(this._userRole);

    void _showActivity(Activity activity) {
        if (_userRole == "attendee" || _userRole == "godparent" || _userRole == "captain") {
            return;
        }
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (_) =>
                    ActivityPage(activity),
                fullscreenDialog: true
            )
        );
    }

    List<Widget> _buildTabs() {
        List<String> days = _activities.keys.toList();
        days.sort((String day1, String day2) => day1.compareTo(day2));
        return days.map((d) => Tab(text: d)).toList();
    }

    Widget _buildActivitiesList(BuildContext context, ActivitiesScheduleState state) {
        if (state.activities.keys.length != 0) {
            _activities = state.activities;
            _tabController = TabController(
                length: _activities.keys.length,
                vsync: this,
                initialIndex: currentTabIndex,
            );
            _tabController.addListener(() => currentTabIndex = _tabController.index);
        }
        if (_tabController == null) {
            return Row(
                children: <Widget>[
                    AppTitle(LocalizationService
                        .of(context)
                        .schedule['title'], MainAxisAlignment.start)
                ]);
        }
        return Column(
            children: <Widget>[
                Row(
                    children: <Widget>[
                        AppTitle(LocalizationService
                            .of(context)
                            .schedule['title'], MainAxisAlignment.start)
                    ]
                ),
                Container(
                    width: MediaQuery
                        .of(context)
                        .size
                        .width * 0.925,
                    margin: EdgeInsets.only(bottom: 5.0),
                    child: Material(
                        color: Colors.white,
                        child: TabBar(
                            indicator: BoxDecoration(
                                gradient: LinearGradient(
                                    begin: Alignment.centerLeft,
                                    colors: [Constants.csLightBlue, Constants.csLightBlue.withOpacity(0.8)],
                                    tileMode: TileMode.repeated,
                                ),
                                boxShadow: <BoxShadow>[
                                    BoxShadow(
                                        color: Colors.black.withOpacity(0.1),
                                        offset: Offset(1.1, 1.1),
                                        blurRadius: 5.0,
                                    ),
                                ]
                            ),
                            labelStyle: TextStyle(
                                fontFamily: 'Montserrat',
                                fontWeight: FontWeight.w600,
                                fontSize: MediaQuery
                                    .of(context)
                                    .size
                                    .width * 0.035,
                            ),
                            unselectedLabelColor: Colors.black,
                            labelColor: Colors.white,
                            controller: _tabController,
                            tabs: _buildTabs()
                        )
                    )
                ),
                Flexible(
                    child: TabBarView(
                        controller: _tabController,
                        children: _activities.keys.map((d) =>
                            SingleChildScrollView(
                                child: Column(
                                    children: ScheduleService.getSortedKeysForDaySchedule(_activities[d]).map((t) =>
                                        Container(
                                            child: Column(
                                                children: <Widget>[
                                                    TimeCard(t),
                                                    Column(
                                                        children: _activities[d][t].map((a) =>
                                                            FlatButton(
                                                                child: ActivityCard(a),
                                                                onPressed: () => _showActivity(a)
                                                            )
                                                        ).toList()
                                                    )
                                                ]
                                            )
                                        )
                                    ).toList()
                                )
                            )
                        ).toList()
                    )
                )
            ]
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, ActivitiesScheduleState>(
            onInit: (store) =>
                store.dispatch(LoadActivitiesScheduleAction(LocalizationService
                    .of(context)
                    .code)),
            converter: (store) => store.state.activitiesScheduleState,
            builder: (BuildContext context, ActivitiesScheduleState state) {
                return state.isLoading
                    ? LoadingSpinner()
                    : _buildActivitiesList(context, state);
            }
        );
    }
}