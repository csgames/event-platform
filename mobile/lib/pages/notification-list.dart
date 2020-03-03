import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/notification.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';
import 'package:timeago/timeago.dart' as timeago;

class NotificationListPage extends StatelessWidget {

    IconData _getIcon(AppNotification notification) {
        switch (notification.type) {
            case NotificationTypes.Activity:
                if (notification.activity != null) {
                    switch (notification.activity.type) {
                        case ActivityTypes.Competition:
                            return FontAwesomeIcons.lightLaptopCode;
                        case ActivityTypes.Food:
                            return FontAwesomeIcons.lightUtensils;
                        case ActivityTypes.Transport:
                            return FontAwesomeIcons.lightBus;
                    }
                }
                return FontAwesomeIcons.lightCalendar;
            case NotificationTypes.Event:
                return FontAwesomeIcons.lightCalendarCheck;
        }
    }

    Widget _buildTile(BuildContext context, AppNotification notification) {
        String date = timeago.format(notification.date, locale: LocalizationService
            .of(context)
            .code);
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
                            color: Colors.white,
                            elevation: 0.0,
                            child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                                                    _getIcon(notification),
                                                    size: 25.0,
                                                    color: Constants.csLightBlue,
                                                )
                                            )
                                        ),
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
                                                            color: Constants.csLightBlue,
                                                            fontSize: 12.0,
                                                            fontWeight: FontWeight.w400
                                                        ),
                                                    ) : Container(),
                                                    Column(
                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                        children: <Widget>[
                                                            Text(
                                                                notification.title,
                                                                style: TextStyle(
                                                                    color: Constants.csBlue,
                                                                    fontFamily: 'Montserrat',
                                                                    fontSize: 15.0,
                                                                    fontWeight: FontWeight.w700
                                                                )
                                                            ),
                                                            Container(
                                                                padding: EdgeInsets.only(top: 2.0),
                                                                child: Text(
                                                                    notification.body,
                                                                    style: TextStyle(
                                                                        fontFamily: 'Montserrat',
                                                                        fontSize: 14.0,
                                                                        fontWeight: FontWeight.w400,
                                                                        height: 1.3
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
                                                                color: Constants.csBlue,
                                                                fontFamily: 'Montserrat',
                                                                fontWeight: FontWeight.w200,
                                                                fontSize: 12.0
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

    Widget _buildNotifications(BuildContext context, _NotificationsListViewModel model) {
        return Container(
            padding: EdgeInsets.only(left: 15.0, right: 15.0, top: 10.0),
            child: ListView(
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                children: model.notifications.map((n) => _buildTile(context, n)).toList()
            )
        );
    }

    Widget _buildBody(BuildContext context, _NotificationsListViewModel model) {
        model.notifications.sort((AppNotification a, AppNotification b) => b.date.compareTo(a.date));
        if (model.notifications.length > 0) {
            return model.hasErrors
                ? Text(LocalizationService
                .of(context)
                .notification['error'])
                : _buildNotifications(context, model);
        } else {
            return Center(
                child: Text(LocalizationService
                    .of(context)
                    .notification['no-notifications'])
            );
        }
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
                                fontFamily: 'Montserrat'
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