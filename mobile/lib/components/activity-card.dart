import 'package:CSGamesApp/components/expansion-card.dart';
import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/redux/actions/activities-subscription-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:redux/redux.dart';

class ActivityCard extends StatelessWidget {
    final Activity _activity;

    ActivityCard(this._activity);

    IconData get _icon {
        switch (_activity.type) {
            case ActivityTypes.Food:
                return FontAwesomeIcons.lightUtensils;
            case ActivityTypes.Competition:
                return FontAwesomeIcons.lightLaptopCode;
            case ActivityTypes.Transport:
                return FontAwesomeIcons.lightBus;
            default:
                return FontAwesomeIcons.lightCalendar;
        }
    }

    Widget _buildRightIcon(_ActivitySubscriptionViewModel vm) {
        if (vm.userRole == "admin" || vm.userRole == "volunteer" || vm.userRole == "super-admin") {
            return Icon(
                Icons.nfc,
                size: 30,
                color: Constants.csBlue.withOpacity(0.5),
            );
        }
        if (vm.isLoading) {
            return SpinKitWanderingCubes(
                color: Constants.csLightBlue,
                size: 30.0,
            );
        } else {
            return Icon(
                vm.isSubscribed ? FontAwesomeIcons.lightCheckCircle : FontAwesomeIcons.lightTimesCircle,
                color: vm.isSubscribed ? Colors.green : Colors.red,
                size: 30.0
            );
        }
    }

    Widget _buildCardTitle(BuildContext context, _ActivitySubscriptionViewModel vm) {
        String code = LocalizationService
            .of(context)
            .code;
        var formatter = DateFormat.Hm(code);
        var beginHour = formatter.format(_activity.beginDate);
        var endHour = formatter.format(_activity.endDate);
        return Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
                Padding(
                    padding: EdgeInsets.only(left: 15.0, right: 10.0),
                    child: Container(
                        decoration: BoxDecoration(
                            color: Constants.csLightBlue.withOpacity(0.05),
                            shape: BoxShape.circle
                        ),
                        child: Padding(
                            padding: EdgeInsets.all(20.0),
                            child: Icon(
                                _icon,
                                size: 25.0,
                                color: Constants.csLightBlue,
                            )
                        )
                    ),
                ),
                Expanded(
                    child: Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                                Text(
                                    _activity.name[LocalizationService
                                        .of(context)
                                        .language] ?? "",
                                    style: TextStyle(
                                        color: Constants.csBlue,
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w600,
                                        fontFamily: 'Montserrat'
                                    )
                                ),
                                Padding(
                                    padding: const EdgeInsets.only(top: 3.0),
                                    child: Text(
                                        "$beginHour - $endHour",
                                        style: TextStyle(
                                            color: Constants.csBlue,
                                            fontSize: 15.0,
                                            fontWeight: FontWeight.w400,
                                            fontFamily: 'Montserrat'
                                        )
                                    )
                                ),
                                Padding(
                                    padding: const EdgeInsets.only(top: 3.0),
                                    child: Text(
                                        _activity.location,
                                        style: TextStyle(
                                            color: Constants.csBlue,
                                            fontWeight: FontWeight.w200,
                                            fontSize: 12.0,
                                            fontFamily: 'Montserrat'
                                        )
                                    )
                                )
                            ]
                        )
                    )
                ),
                Container(
                    width: 70.0,
                    height: 70.0,
                    child: Padding(
                        padding: EdgeInsets.all(20.0),
                        child: _buildRightIcon(vm)
                    )
                )
            ]
        );
    }

    List<Widget> _buildCardContent(BuildContext context, _ActivitySubscriptionViewModel vm) {
        return <Widget>[
            Container(
                padding: EdgeInsets.only(left: 10.0, right: 10.0, bottom: 15.0),
                child: Text(
                    _activity.description[LocalizationService
                        .of(context)
                        .language] ?? "",
                    textAlign: TextAlign.justify,
                    style: TextStyle(
                        color: Colors.black,
                        fontFamily: 'Montserrat',
                        fontSize: 12.0,
                        height: 1.3
                    )
                )
            ),
            Padding(
                padding: EdgeInsets.only(bottom: 10.0),
                child: PillButton(
                    color: vm.isSubscribed ? Colors.grey : Constants.csBlue,
                    onPressed: () {
                        if (!vm.isSubscribed) vm.subscribe(_activity.id);
                    },
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(16.0, 15.0, 16.0, 15.0),
                        child: Text(
                            vm.isSubscribed ? LocalizationService
                                .of(context)
                                .activity['subscribed'] : LocalizationService
                                .of(context)
                                .activity['subscribe'],
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 15.0
                            )
                        )
                    )
                )
            )
        ];
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _ActivitySubscriptionViewModel>(
            onInit: (store) {
                if ((store.state.activitiesSubscriptionState.activities[_activity.id] == null ||
                    store.state.activitiesSubscriptionState.activities[_activity.id].isSubscribed == null) &&
                    (store.state.currentAttendee.role == "attendee" ||
                        store.state.currentAttendee.role == "godparent" ||
                        store.state.currentAttendee.role == "captain")) {
                    if (_activity.subscribed) {
                        store.dispatch(SubscribedAction(_activity.id, true));
                    } else {
                        store.dispatch(NotSubscribedAction(_activity.id));
                    }
                }
            },
            converter: (store) => _ActivitySubscriptionViewModel.fromStore(_activity.id, store),
            builder: (BuildContext context, _ActivitySubscriptionViewModel model) {
                return Container(
                    margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
                    child: Stack(
                        children: <Widget>[
                            Container(
                                decoration: BoxDecoration(
                                    color: Colors.white,
                                    boxShadow: <BoxShadow>[
                                        BoxShadow(
                                            color: Colors.black.withOpacity(0.1),
                                            offset: Offset(1.1, 1.1),
                                            blurRadius: 5.0,
                                        ),
                                    ]
                                ),
                                child: Material(
                                    elevation: 0,
                                    color: Colors.white,
                                    child: Theme(
                                        data: Theme.of(context).copyWith(accentColor: Colors.black),
                                        child: model.userRole == "attendee" ||
                                            model.userRole == "captain" ||
                                            model.userRole == "godparent" ? ExpansionCard(
                                            title: _buildCardTitle(context, model),
                                            children: _buildCardContent(context, model)
                                        ) : _buildCardTitle(context, model)
                                    )
                                )
                            ),
                            Positioned(
                                top: 0.0,
                                child: Center(
                                    child: Container(
                                        width: 80,
                                        height: 6,
                                        child: Material(
                                            color: Constants.csBlue,
                                            child: Text('')
                                        )
                                    )
                                )
                            )
                        ]
                    )
                );
            }
        );
    }
}

class _ActivitySubscriptionViewModel {
    bool hasErrors;
    bool isLoading;
    bool isSubscribed;
    String userRole;
    Function subscribe;

    _ActivitySubscriptionViewModel(this.hasErrors,
        this.isLoading,
        this.isSubscribed,
        this.userRole,
        this.subscribe);

    _ActivitySubscriptionViewModel.fromStore(String activityId, Store<AppState> store) {
        userRole = store.state.currentAttendee.role;
        if (store.state.activitiesSubscriptionState.activities[activityId] != null) {
            hasErrors = store.state.activitiesSubscriptionState.activities[activityId].hasErrors;
            isLoading = store.state.activitiesSubscriptionState.activities[activityId].isLoading;
            isSubscribed = store.state.activitiesSubscriptionState.activities[activityId].isSubscribed;
            subscribe = (activityId) => store.dispatch(SubscribeAction(activityId));
        } else {
            hasErrors = false;
            isLoading = false;
            isSubscribed = false;
            subscribe = () {};
        }
    }
}