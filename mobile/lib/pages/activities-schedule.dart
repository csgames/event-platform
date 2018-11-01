import 'package:PolyHxApp/redux/actions/activities-schedule-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:PolyHxApp/components/activity-card.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/pages/activity.dart';

class ActivitiesSchedulePage extends StatefulWidget {
  final String _eventId;

  ActivitiesSchedulePage(this._eventId);

  @override
  State<StatefulWidget> createState() => _ActivitiesScheduleState(_eventId);
}

class _ActivitiesScheduleState extends State<ActivitiesSchedulePage> with TickerProviderStateMixin {
  String _eventId;
  TabController _tabController;
  Map<String, List<Activity>> _activities;

  _ActivitiesScheduleState(this._eventId);

  void _showActivity(Activity activity) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ActivityPage(activity),
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
          vsync: this
      );
    }
    if (_tabController == null) return Container();
    return Column(
      children: <Widget> [
        TabBar(
          labelColor: Colors.black,
          controller: _tabController,
          tabs: _buildTabs()
        ),
        Flexible(
          child: TabBarView(
            controller: _tabController,
            children: _activities.keys.map((d) =>
              SingleChildScrollView(
                child: Column(
                  children: _activities[d].map((a) =>
                    FlatButton(
                      child: ActivityCard(a),
                      onPressed: () => _showActivity(a)
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
          store.dispatch(LoadActivitiesScheduleAction(_eventId, LocalizationService.of(context).code));
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