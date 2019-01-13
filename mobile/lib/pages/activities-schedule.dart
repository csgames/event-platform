import 'package:PolyHxApp/components/time-card.dart';
import 'package:PolyHxApp/components/title.dart';
import 'package:PolyHxApp/redux/actions/activities-schedule-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/services/schedule.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:PolyHxApp/components/activity-card.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/pages/activity.dart';

class ActivitiesSchedulePage extends StatefulWidget {
    final String _eventId;
    final String _userRole;

    ActivitiesSchedulePage(this._eventId, this._userRole);

    @override
    State<StatefulWidget> createState() => _ActivitiesScheduleState(_eventId, this._userRole);
}

class _ActivitiesScheduleState extends State<ActivitiesSchedulePage> with TickerProviderStateMixin {
    String _eventId;
    String _userRole;
    TabController _tabController;
    Map<String, Map<String, List<Activity>>> _activities;
    int currentTabIndex = 0;

    _ActivitiesScheduleState(this._eventId, this._userRole);

    void _showActivity(Activity activity) {
        if (_userRole == "attendee") {
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
        if (_tabController == null) return Column(children: <Widget>[AppTitle(LocalizationService
            .of(context)
            .schedule['title'], MainAxisAlignment.start)
        ]);
        return Column(
            children: <Widget>[
                AppTitle(LocalizationService
                    .of(context)
                    .schedule['title'], MainAxisAlignment.start),
                Container(
                    width: MediaQuery
                        .of(context)
                        .size
                        .width * 0.925,
                    margin: EdgeInsets.only(bottom: 5.0),
                    child: Material(
                        borderRadius: BorderRadius.circular(15.0),
                        elevation: 0.3,
                        color: Colors.white,
                        child: TabBar(
                            indicator: BoxDecoration(
                                color: Constants.polyhxRed,
                                borderRadius: BorderRadius.circular(15.0)
                            ),
                            labelStyle: TextStyle(
                                fontFamily: 'OpenSans',
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
            onInit: (store) {
                final state = store.state.activitiesScheduleState;
                if (state.activities.isEmpty && !state.isLoading && !state.hasErrors) {
                    store.dispatch(LoadActivitiesScheduleAction(_eventId, LocalizationService
                        .of(context)
                        .code));
                }
            },
            converter: (store) => store.state.activitiesScheduleState,
            builder: (BuildContext context, ActivitiesScheduleState state) {
                return state.isLoading
                    ? LoadingSpinner()
                    : _buildActivitiesList(context, state);
            }
        );
    }
}