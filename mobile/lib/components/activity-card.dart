import 'package:PolyHxApp/components/expansion-card.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/redux/actions/activities-subscription-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:redux/redux.dart';

class ActivityCard extends StatelessWidget {
    final Activity _activity;

    ActivityCard(this._activity);

    IconData get _icon {
        switch (_activity.type) {
            case ActivityTypes.Lunch:
                return FontAwesomeIcons.utensils;
            case ActivityTypes.Workshop:
                return FontAwesomeIcons.laptopCode;
            default:
                return FontAwesomeIcons.calendar;
        }
    }

    Widget _buildRightIcon(_ActivitySubscriptionViewModel vm) {
        if (vm.userRole != "attendee") {
            return Icon(
                Icons.nfc,
                size: 30
            );
        }
        if (vm.isLoading) {
            return SpinKitCircle(
                color: Colors.grey,
                size: 30.0,
            );
        } else {
            return Icon(
                vm.isSubscribed ? FontAwesomeIcons.checkCircle : FontAwesomeIcons.timesCircle,
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
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    child: Icon(
                        _icon,
                        size: 45.0
                    )
                ),
                Expanded(
                    child: Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                                Text(
                                    _activity.name,
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w600,
                                        fontFamily: 'OpenSans'
                                    )
                                ),
                                Padding(
                                    padding: const EdgeInsets.only(top: 3.0),
                                    child: Text(
                                        "$beginHour - $endHour",
                                        style: TextStyle(
                                            fontSize: 15.0,
                                            fontWeight: FontWeight.w400,
                                            fontFamily: 'OpenSans'
                                        )
                                    )
                                ),
                                Padding(
                                    padding: const EdgeInsets.only(top: 3.0),
                                    child: Text(
                                        _activity.location,
                                        style: TextStyle(
                                            fontWeight: FontWeight.w100,
                                            fontSize: 15.0,
                                            fontFamily: 'OpenSans'
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
            Row(
                children: <Widget>[
                    Padding(
                        padding: EdgeInsets.only(left: 20.0, right: 20.0, bottom: 15.0),
                        child: Text(
                            _activity.description[LocalizationService
                                .of(context)
                                .language] ?? "",
                            textAlign: TextAlign.justify,
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'OpenSans',
                                fontSize: 15.0,
                                height: 1.15
                            )
                        )
                    )
                ],
            ),
            Padding(
                padding: EdgeInsets.only(top: 10.0, bottom: 10.0),
                child: PillButton(
                    color: vm.isSubscribed ? Colors.grey : Constants.polyhxRed,
                    onPressed: () {
                        if (!vm.isSubscribed) vm.subscribe(_activity.id);
                    },
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(16.0, 12.5, 16.0, 12.5),
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
                    store.state.currentUser.role == "attendee") {
                    store.dispatch(VerifySubscriptionAction(_activity.id, store.state.currentAttendee?.id ?? ''));
                }
            },
            converter: (store) => _ActivitySubscriptionViewModel.fromStore(_activity.id, store),
            builder: (BuildContext context, _ActivitySubscriptionViewModel model) {
                return Container(
                    margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
                    child: Material(
                        borderRadius: BorderRadius.circular(15.0),
                        elevation: 1.0,
                        color: Colors.white,
                        child: Theme(
                            data: Theme.of(context).copyWith(accentColor: Colors.black),
                            child: model.userRole == "attendee" ? ExpansionCard(
                                title: _buildCardTitle(context, model),
                                children: _buildCardContent(context, model)
                            ) : _buildCardTitle(context, model)
                        )
                    )
                );
            });
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
        userRole = store.state.currentUser.role;
        if (store.state.activitiesSubscriptionState.activities[activityId] != null) {
            hasErrors = store.state.activitiesSubscriptionState.activities[activityId].hasErrors;
            isLoading = store.state.activitiesSubscriptionState.activities[activityId].isLoading;
            isSubscribed = store.state.activitiesSubscriptionState.activities[activityId].isSubscribed;
            subscribe = (activityId) => store.dispatch(SubscribeAction(activityId, store.state.currentAttendee?.id ?? ''));
        } else {
            hasErrors = false;
            isLoading = false;
            isSubscribed = false;
            subscribe = () {};
        }
    }
}