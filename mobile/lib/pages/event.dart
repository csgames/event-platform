import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/pages/activities-schedule.dart';
import 'package:CSGamesApp/pages/attendee-retrieval.dart';
import 'package:CSGamesApp/pages/event-info.dart';
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
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
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
        return <Widget>[
            _buildItem(EventTabs.Guide.index, FontAwesomeIcons.book),
            _buildItem(EventTabs.Sponsors.index, FontAwesomeIcons.gem),
            if (vm.puzzleHeroOpen ?? false)
                _buildItem(EventTabs.Puzzle.index, FontAwesomeIcons.puzzlePiece),
            _buildItem(EventTabs.Activities.index, FontAwesomeIcons.calendar),
            _buildItem(EventTabs.Profile.index, FontAwesomeIcons.userAlt)
        ];
    }

    List<Widget> _buildVolunteerItems(_EventPageViewModel model) {
        return <Widget>[
            _buildItem(VolunteerTabs.Scan.index, FontAwesomeIcons.qrcode),
            _buildItem(VolunteerTabs.Guide.index, FontAwesomeIcons.book, onPressed: () {
                if (_currentTabIndex == VolunteerTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = VolunteerTabs.Guide.index);
            }),
            _buildItem(VolunteerTabs.Sponsors.index, FontAwesomeIcons.gem, onPressed: () {
                if (_currentTabIndex == VolunteerTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = VolunteerTabs.Sponsors.index);
            }),
            _buildItem(VolunteerTabs.Activities.index, FontAwesomeIcons.calendar, onPressed: () {
                if (_currentTabIndex == VolunteerTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = VolunteerTabs.Activities.index);
            }),
            _buildItem(VolunteerTabs.Profile.index, FontAwesomeIcons.userAlt, onPressed: () {
                if (_currentTabIndex == VolunteerTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = VolunteerTabs.Profile.index);
            })
        ];
    }

    List<Widget> _buildAdminItems(_EventPageViewModel model) {
        return <Widget>[
            _buildItem(AdminEventTabs.Scan.index, FontAwesomeIcons.qrcode),
            _buildItem(AdminEventTabs.Notification.index, FontAwesomeIcons.lightCommentAlt, onPressed: () {
                if (_currentTabIndex == AdminEventTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = AdminEventTabs.Notification.index);
            }),
            _buildItem(AdminEventTabs.Sponsors.index, FontAwesomeIcons.gem, onPressed: () {
                if (_currentTabIndex == AdminEventTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = AdminEventTabs.Sponsors.index);
            }),
            _buildItem(AdminEventTabs.Activities.index, FontAwesomeIcons.calendar, onPressed: () {
                if (_currentTabIndex == AdminEventTabs.Scan.index) {
                    model.unsubscribe();
                }
                setState(() => _currentTabIndex = AdminEventTabs.Activities.index);
            }),
        ];
    }

    Widget _buildItem(int index, IconData icon, {Function onPressed}) {
        return Container(
            margin: EdgeInsets.all(2.0),
            decoration: BoxDecoration(
                color: _currentTabIndex == index ? Constants.csLightBlue.withOpacity(0.05) : Colors.transparent,
                shape: BoxShape.circle
            ),
            child: IconButton(
                icon: Icon(
                    icon,
                    color: _currentTabIndex == index ? Constants.csLightBlue : Constants.csBlue
                ),
                onPressed: onPressed ?? () {
                    setState(() {
                        _currentTabIndex = index;
                    });
                }
            ),
        );
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
                style: TextStyle(fontFamily: 'Montserrat')
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

    _EventPageViewModel(this.hasUnseenNotifications,
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
        this.puzzleHeroOpen);

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