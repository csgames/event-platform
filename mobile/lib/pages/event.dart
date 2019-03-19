import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/pages/notification-list.dart';
import 'package:CSGamesApp/pages/notification.dart';
import 'package:CSGamesApp/pages/profile.dart';
import 'package:CSGamesApp/pages/puzzle-hero.dart';
import 'package:CSGamesApp/pages/sponsors-page.dart';
import 'package:CSGamesApp/redux/actions/activities-schedule-actions.dart';
import 'package:CSGamesApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:CSGamesApp/redux/actions/guide-actions.dart';
import 'package:CSGamesApp/redux/actions/notification-actions.dart';
import 'package:CSGamesApp/redux/actions/profile-actions.dart';
import 'package:CSGamesApp/redux/actions/puzzle-actions.dart';
import 'package:CSGamesApp/redux/actions/puzzle-hero-actions.dart';
import 'package:CSGamesApp/redux/actions/sponsors-actions.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/pages/activities-schedule.dart';
import 'package:CSGamesApp/pages/attendee-retrieval.dart';
import 'package:CSGamesApp/pages/event-info.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';

class EventPage extends StatefulWidget {
    EventPage({Key key}) : super(key: key);

    @override
    _EventPageState createState() => _EventPageState();
}

enum EventTabs { Guide, Sponsors, Puzzle, Activities, Profile }
enum VolunteerTabs { Scan, Guide, Sponsors, Activities, Profile }
enum AdminEventTabs { Scan, Notification, Sponsors, Activities, Profile }

class _EventPageState extends State<EventPage> {
    int _currentTabIndex = 0;

    Widget _buildBody(_EventPageViewModel model) {
        Widget body;
        switch (EventTabs.values[_currentTabIndex]) {
            case EventTabs.Puzzle:
                body = PuzzleHeroPage();
                break;
            case EventTabs.Guide:
                body = EventInfoPage();
                break;
            case EventTabs.Activities:
                body = ActivitiesSchedulePage(model.attendee?.role);
                break;
            case EventTabs.Profile:
                body = ProfilePage();
                break;
            case EventTabs.Sponsors:
                body = SponsorsPage();
                break;
            default:
                break;
        }
        return body;
    }

    Widget _buildBodyVolunteer(_EventPageViewModel model) {
        Widget body;
        switch (VolunteerTabs.values[_currentTabIndex]) {
            case VolunteerTabs.Scan:
                body = AttendeeRetrievalPage(model.event);
                break;
            case VolunteerTabs.Guide:
                body = EventInfoPage();
                break;
            case VolunteerTabs.Activities:
                body = ActivitiesSchedulePage(model.attendee.role);
                break;
            case VolunteerTabs.Profile:
                body = ProfilePage();
                break;
            case VolunteerTabs.Sponsors:
                body = SponsorsPage();
                break;
            default:
                break;
        }
        return body;
    }

    Widget _buildBodyAdmin(_EventPageViewModel model) {
        Widget body;
        switch (AdminEventTabs.values[_currentTabIndex]) {
            case AdminEventTabs.Scan:
                body = AttendeeRetrievalPage(model.event);
                break;
            case AdminEventTabs.Notification:
                body = NotificationPage();
                break;
            case AdminEventTabs.Activities:
                body = ActivitiesSchedulePage(model.attendee.role);
                break;
            case AdminEventTabs.Profile:
                body = ProfilePage();
                break;
            case AdminEventTabs.Sponsors:
                body = SponsorsPage();
                break;
            default:
                break;
        }
        return body;
    }

    Future<bool> _reset(_EventPageViewModel model) async {
        model.resetAttendeeRetrieval();
        model.resetSchedule();
        model.resetSponsors();
        model.resetGuide();
        model.resetTeam();
        model.resetPuzzle();
        model.resetPuzzleCard();
        return true;
    }

    List<Widget> _buildItems(_EventPageViewModel vm) {
        if (vm.puzzleHeroOpen != null && vm.puzzleHeroOpen) {
            return <Widget>[
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.book,
                        color: _currentTabIndex == EventTabs.Guide.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Guide.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.gem,
                        color: _currentTabIndex == EventTabs.Sponsors.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Sponsors.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.puzzlePiece,
                        color: _currentTabIndex == EventTabs.Puzzle.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Puzzle.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.calendar,
                        color: _currentTabIndex == EventTabs.Activities.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Activities.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.userAlt,
                        color: _currentTabIndex == EventTabs.Profile.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Profile.index);
                    }
                )
            ];
        } else {
            return <Widget>[
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.book,
                        color: _currentTabIndex == EventTabs.Guide.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Guide.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.gem,
                        color: _currentTabIndex == EventTabs.Sponsors.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Sponsors.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.calendar,
                        color: _currentTabIndex == EventTabs.Activities.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Activities.index);
                    }
                ),
                IconButton(
                    icon: Icon(
                        FontAwesomeIcons.userAlt,
                        color: _currentTabIndex == EventTabs.Profile.index ? Constants.csBlue : Colors.black
                    ),
                    onPressed: () {
                        setState(() => _currentTabIndex = EventTabs.Profile.index);
                    }
                )
            ];
        }
    }

    List<Widget> _buildVolunteerItems(_EventPageViewModel model) {
        return <Widget>[
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.qrcode,
                    color: _currentTabIndex == VolunteerTabs.Scan.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    setState(() => _currentTabIndex = VolunteerTabs.Scan.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.book,
                    color: _currentTabIndex == VolunteerTabs.Guide.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = VolunteerTabs.Guide.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.gem,
                    color: _currentTabIndex == VolunteerTabs.Sponsors.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = VolunteerTabs.Sponsors.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.calendar,
                    color: _currentTabIndex == VolunteerTabs.Activities.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = VolunteerTabs.Activities.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.userAlt,
                    color: _currentTabIndex == VolunteerTabs.Profile.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = VolunteerTabs.Profile.index);
                }
            )
        ];
    }

    List<Widget> _buildAdminItems(_EventPageViewModel model) {
        return <Widget>[
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.qrcode,
                    color: _currentTabIndex == AdminEventTabs.Scan.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    setState(() => _currentTabIndex = AdminEventTabs.Scan.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.commentAlt,
                    color: _currentTabIndex == AdminEventTabs.Notification.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = AdminEventTabs.Notification.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.gem,
                    color: _currentTabIndex == AdminEventTabs.Sponsors.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = AdminEventTabs.Sponsors.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.calendar,
                    color: _currentTabIndex == AdminEventTabs.Activities.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = AdminEventTabs.Activities.index);
                }
            ),
            IconButton(
                icon: Icon(
                    FontAwesomeIcons.userAlt,
                    color: _currentTabIndex == AdminEventTabs.Profile.index ? Constants.csBlue : Colors.black
                ),
                onPressed: () {
                    if (_currentTabIndex == VolunteerTabs.Scan.index) {
                        model.unsubscribe();
                    }
                    setState(() => _currentTabIndex = AdminEventTabs.Profile.index);
                }
            )
        ];
    }

    Widget _buildNavigationBar(_EventPageViewModel vm) {
        List<Widget> items;
        String role = vm.attendee != null ? vm.attendee.role : "";
        switch (role) {
            case 'admin':
                items = _buildAdminItems(vm);
                break;
            case 'volunteer':
                items = _buildVolunteerItems(vm);
                break;
            case 'director':
                items = _buildVolunteerItems(vm);
                break;
            default:
                items = _buildItems(vm);
                break;
        }
        return BottomAppBar(
            elevation: 20.0,
            child: Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: items
            )
        );
    }

    Widget _buildAppBar(BuildContext context, _EventPageViewModel model) {
        return AppBar(
            backgroundColor: Constants.csBlue,
            title: Text(
                model.event.name,
                style: TextStyle(fontFamily: 'OpenSans')
            ),
            actions: <Widget>[
                Stack(
                    children: <Widget>[
                        IconButton(
                            icon: Icon(FontAwesomeIcons.bell),
                            color: Colors.white,
                            onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (_) => NotificationListPage(),
                                        fullscreenDialog: true
                                    )
                                );
                            }
                        ),
                        Positioned(
                            top: 9.0,
                            right: 9.0,
                            child: Center(
                                child: Container(
                                    width: 10,
                                    decoration: BoxDecoration(
                                        color: model.hasUnseenNotifications == true ? Colors.white : Colors.transparent,
                                        shape: BoxShape.circle
                                    ),
                                    child: Text('')
                                )
                            )
                        )
                    ]
                )
            ]
        );
    }

    Widget _selectBody(_EventPageViewModel model) {
        Widget body;
        String role = model.attendee != null ? model.attendee.role : "";
        switch (role) {
            case 'admin':
                body = _buildBodyAdmin(model);
                break;
            case 'volunteer':
                body = _buildBodyVolunteer(model);
                break;
            case 'director':
                body = _buildBodyVolunteer(model);
                break;
            default:
                body = _buildBody(model);
                break;
        }
        return body;
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _EventPageViewModel>(
            onInit: (store) {
                GetCurrentAttendeeAction action = GetCurrentAttendeeAction();
                store.dispatch(action);
                store.dispatch(CheckUnseenNotificationsAction(store.state.currentEvent.id));
                action.completer.future.then((role) {
                    if (role == "attendee"
                        || role == "godparent"
                        || role == "captain") {
                        store.dispatch(GetCurrentTeamAction());
                        store.dispatch(LoadPuzzleHeroInfoAction());
                    }
                });
            },
            converter: (store) => _EventPageViewModel.fromStore(store),
            builder: (BuildContext context, _EventPageViewModel model) {
                return WillPopScope(
                    onWillPop: () => _reset(model),
                    child: Scaffold(
                        appBar: _buildAppBar(context, model),
                        body: _selectBody(model),
                        resizeToAvoidBottomPadding: false,
                        bottomNavigationBar: _buildNavigationBar(model)
                    )
                );
            }
        );
    }
}

class _EventPageViewModel {
    bool hasUnseenNotifications;
    Event event;
    Attendee attendee;
    bool puzzleHeroOpen;
    Function resetSchedule;
    Function resetAttendeeRetrieval;
    Function resetCurrentAttendee;
    Function resetSponsors;
    Function resetGuide;
    Function resetTeam;
    Function unsubscribe;
    Function resetPuzzle;
    Function resetPuzzleCard;

    _EventPageViewModel(
        this.hasUnseenNotifications,
        this.event,
        this.attendee,
        this.resetSchedule,
        this.resetAttendeeRetrieval,
        this.resetSponsors,
        this.resetGuide,
        this.resetTeam,
        this.unsubscribe,
        this.resetPuzzle,
        this.resetCurrentAttendee,
        this.resetPuzzleCard,
        this.puzzleHeroOpen
    );

    _EventPageViewModel.fromStore(Store<AppState> store) {
        hasUnseenNotifications = store.state.notificationState.hasUnseenNotifications;
        event = store.state.currentEvent;
        attendee = store.state.currentAttendee;
        puzzleHeroOpen = store.state.puzzleHeroState?.isOpen ?? false;
        resetSchedule = () => store.dispatch(ResetScheduleAction());
        resetAttendeeRetrieval = () => store.dispatch(ResetAttendeeAction());
        resetCurrentAttendee = () => store.dispatch(ResetCurrentAttendeeAction());
        resetSponsors = () => store.dispatch(ResetSponsorsAction());
        resetGuide = () => store.dispatch(InitGuideAction());
        resetTeam = () => store.dispatch(ResetTeamAction());
        unsubscribe = () => store.dispatch(UnsubscribeAction());
        resetPuzzle = () => store.dispatch(ResetPuzzleHeroAction());
        resetPuzzleCard = () => store.dispatch(ResetPuzzleAction());
    }
}