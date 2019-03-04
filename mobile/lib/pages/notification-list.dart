import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';
import 'package:timeago/timeago.dart' as timeago;

class NotificationListPage extends StatelessWidget {

    _getIcon(AppNotification notification) {
        switch (notification.type) {
            case NotificationTypes.Activity:
                if (notification.activity != null) {
                    switch (notification.activity.type) {
                        case ActivityTypes.Competition:
                            return FontAwesomeIcons.laptopCode;
                        case ActivityTypes.Food:
                            return FontAwesomeIcons.utensils;
                    }
                }
                return FontAwesomeIcons.calendar;
            case NotificationTypes.Event:
                return FontAwesomeIcons.calendarCheck;
        }
    }

    Widget _buildTile(BuildContext context, AppNotification notification) {
        String date = timeago.format(notification.date, locale: LocalizationService
            .of(context)
            .code);
        return Padding(
            padding: EdgeInsets.fromLTRB(15.0, 3.0, 15.0, 3.0),
            child: Material(
                borderRadius: BorderRadius.circular(5.0),
                color: Colors.white,
                elevation: 1.0,
                child: Padding(
                    padding: EdgeInsets.only(left: 10.0),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                            Padding(
                                padding: EdgeInsets.all(10.0),
                                child: Icon(
                                    _getIcon(notification),
                                    color: notification.type == NotificationTypes.Event ? Constants.csRed : Constants.csBlue,
                                    size: 40.0,
                                )
                            ),
                            Expanded(
                                child: Padding(
                                    padding: EdgeInsets.all(15.0),
                                    child: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: <Widget>[
                                            notification.activity != null ? Text(
                                                notification.activity.name[LocalizationService
                                                    .of(context)
                                                    .language],
                                                style: TextStyle(
                                                    fontSize: 11.0,
                                                    fontWeight: FontWeight.w400
                                                ),
                                            ) : Container(),
                                            Column(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                children: <Widget>[
                                                    Text(
                                                        notification.title,
                                                        style: TextStyle(
                                                            fontFamily: 'OpenSans',
                                                            fontSize: 15.0,
                                                            fontWeight: FontWeight.w600
                                                        )
                                                    ),
                                                    Container(
                                                        padding: EdgeInsets.only(top: 2.0),
                                                        child: Text(
                                                            notification.body,
                                                            style: TextStyle(
                                                                fontFamily: 'OpenSans',
                                                                fontSize: 15.0,
                                                                fontWeight: FontWeight.w400
                                                            )
                                                        )
                                                    )
                                                ]
                                            ),
                                            Padding(
                                                padding: EdgeInsets.only(top: 3.0),
                                                child: Text(
                                                    date,
                                                    style: TextStyle(
                                                        fontFamily: 'OpenSans',
                                                        fontSize: 10.0
                                                    )
                                                )
                                            )
                                        ]
                                    )
                                )
                            )
                        ]
                    )
                )
            )
        );
    }

    Widget _buildNotifications(BuildContext context, _NotificationsListViewModel model) {
        return Padding(
            padding: EdgeInsets.only(top: 10.0),
            child: ListView(
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                children: model.notifications.map((n) => _buildTile(context, n)).toList()
            )
        );
    }

    Widget _buildBody(BuildContext context, _NotificationsListViewModel model) {
        model.notifications.sort((AppNotification a, AppNotification b) => b.date.compareTo(a.date));
        return model.hasErrors
            ? Text(LocalizationService
            .of(context)
            .notification['error'])
            : _buildNotifications(context, model);
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _NotificationsListViewModel>(
            onInit: (store) {
                final state = store.state.notificationState;
                if (state.notifications.isEmpty && !state.isLoading && !state.hasErrors) {
                    store.dispatch(LoadNotificationsAction(store.state.currentEvent.id));
                }
            },
            converter: (store) => _NotificationsListViewModel.fromStore(store),
            builder: (BuildContext context, _NotificationsListViewModel model) {
                return Scaffold(
                    appBar: AppBar(
                      backgroundColor: Constants.csBlue,
                        leading: IconButton(
                            icon: Icon(Icons.clear),
                            onPressed: () {
                                Navigator.pop(context);
                                model.reset();
                            }
                        ),
                        title: Text(
                            LocalizationService
                                .of(context)
                                .notification['title'],
                            style: TextStyle(
                                fontFamily: 'OpenSans'
                            )
                        )
                    ),
                    body: model.isLoading
                        ? Center(child: LoadingSpinner())
                        : _buildBody(context, model)
                );
            }
        );
    }
}

class _NotificationsListViewModel {
    List<AppNotification> notifications;
    bool isLoading;
    bool hasErrors;
    Function reset;

    _NotificationsListViewModel(this.notifications,
        this.isLoading,
        this.hasErrors,
        this.reset);

    _NotificationsListViewModel.fromStore(Store<AppState> store) {
        notifications = store.state.notificationState.notifications;
        isLoading = store.state.notificationState.isLoading;
        hasErrors = store.state.notificationState.hasErrors;
        reset = () => store.dispatch(ResetNotificationsAction());
    }
}