import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/redux/actions/event-actions.dart';
import 'package:CSGamesApp/redux/actions/login-actions.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:CSGamesApp/utils/routes.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:redux/redux.dart';

class EventList extends StatelessWidget {
    bool _eventsChecked = false;

    Widget _buildEventCards(_EventListPageViewModel model, BuildContext context) {
        if (model.hasErrors) {
            return Text(LocalizationService
                .of(context)
                .eventList['error']);
        }

        model.events.sort((Event a, Event b) => b.beginDate.compareTo(a.beginDate));
        return SingleChildScrollView(
            child: Column(
                children: model.events.map((event) {
                    return StoreConnector<AppState, VoidCallback>(
                        converter: (store) => () => store.dispatch(SetCurrentEventAction(event)),
                        builder: (BuildContext context, VoidCallback setCurrentEvent) {
                            return FlatButton(
                                padding: EdgeInsets.all(15.0),
                                child: _buildEventCard(context, event),
                                onPressed: () {
                                    setCurrentEvent();
                                    Navigator.pushNamed(context, Routes.EVENT);
                                },
                            );
                        }
                    );
                }).toList()
            ),
        );
    }

    Widget _buildEventCard(BuildContext context, Event event) {
        String code = LocalizationService
            .of(context)
            .code;
        final formatter = DateFormat.yMMMMd(code);
        return Stack(
            children: <Widget>[
                Container(
                    padding: EdgeInsets.all(10.0),
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
                    child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                            Container(
                                decoration: BoxDecoration(
                                    border: Border.all(
                                        color: Colors.white,
                                        width: 2.0,
                                    )),
                                child: Image.network(
                                    event.imageUrl,
                                    fit: BoxFit.cover,
                                    width: 100,
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
                                                event.name,
                                                style: TextStyle(
                                                    color: Constants.csBlue,
                                                    fontSize: 16.0,
                                                    fontWeight: FontWeight.w800,
                                                    fontFamily: 'Montserrat'
                                                )
                                            ),
                                            Padding(
                                                padding: const EdgeInsets.only(top: 5.0),
                                                child: Text(
                                                    "${formatter.format(event.beginDate)} - ${formatter.format(event.endDate)}",
                                                    style: TextStyle(
                                                        color: Constants.csLightBlue,
                                                        fontSize: 12.0,
                                                        fontWeight: FontWeight.w500,
                                                        fontFamily: 'Montserrat'
                                                    ),
                                                ),
                                            )
                                        ]
                                    )
                                )
                            )
                        ]
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
        );
    }


    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _EventListPageViewModel>(
            onInit: (store) async {
                IsLoggedInAction action = IsLoggedInAction();
                store.dispatch(action);
                action.completer.future.then((isLoggedIn) {
                    final eventState = store.state.eventState;
                    if (isLoggedIn && eventState.events.isEmpty && !eventState.hasErrors) {
                        store.dispatch(LoadEventsAction());
                        store.dispatch(SetupNotificationAction());
                    } else if (!isLoggedIn) {
                        Navigator.pushReplacementNamed(context, Routes.LOGIN);
                    }
                });
            },
            converter: (store) => _EventListPageViewModel.fromStore(store),
            builder: (BuildContext _, _EventListPageViewModel model) {
                return model.isLoading
                    ? Scaffold(body: Center(child: LoadingSpinner()))
                    : Scaffold(
                    appBar: AppBar(
                        backgroundColor: Constants.csBlue,
                        title: Text(
                            LocalizationService
                                .of(context)
                                .eventList['title'],
                            style: TextStyle(
                                fontFamily: 'Montserrat'
                            )
                        ),
                        actions: <Widget>[
                            IconButton(
                                icon: Icon(FontAwesomeIcons.signOutAlt),
                                color: Colors.white,
                                onPressed: () {
                                    model.logOut(context);
                                    model.reset();
                                }
                            )
                        ]
                    ),
                    body: Column(
                        children: <Widget>[
                            Row(
                                children: <Widget>[
                                    AppTitle(
                                        LocalizationService
                                            .of(context)
                                            .eventList['title'],
                                        MainAxisAlignment.start
                                    )
                                ],
                            ),
                            _buildEventCards(model, context),
                        ],
                    )
                );
            },
            onDidChange: (_EventListPageViewModel model) {
                if (model.events.isNotEmpty && !model.hasErrors && !model.isLoading && !_eventsChecked) {
                    _eventsChecked = true;
                    DateTime now = DateTime.now();
                    for (Event event in model.events) {
                        if (event.beginDate.isBefore(now) && event.endDate.isAfter(now)) {
                            model.setCurrentEvent(event);
                            Navigator.pushNamed(context, Routes.EVENT);
                            break;
                        }
                    }
                }
            }
        );
    }
}

class _EventListPageViewModel {
    List<Event> events;
    bool isLoading;
    bool hasErrors;
    Function logOut;
    Function reset;
    Function setCurrentEvent;
    Function getCurrentAttendee;

    _EventListPageViewModel(this.events,
        this.isLoading,
        this.hasErrors,
        this.logOut,
        this.reset,
        this.setCurrentEvent,
        this.getCurrentAttendee);

    _EventListPageViewModel.fromStore(Store<AppState> store) {
        events = store.state.eventState.events;
        isLoading = store.state.eventState.isLoading;
        hasErrors = store.state.eventState.hasErrors;
        logOut = (context) => store.dispatch(LogOut(context));
        reset = () => store.dispatch(ResetAction());
        setCurrentEvent = (event) => store.dispatch(SetCurrentEventAction(event));
    }
}
