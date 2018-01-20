import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/pagetransformer/eventpageitem.dart';
import 'package:PolyHxApp/components/pagetransformer/pagetransformer.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/routes.dart';

class EventList extends StatelessWidget {
  final TokenService _tokenService;
  final EventsService _eventsService;

  EventList(this._tokenService, this._eventsService);

  Future<bool> isLoggedIn() async {
    return _tokenService.validateTokens();
  }

  Future<List<Event>> fetchAllEvents() async {
    return _eventsService.getAllEvents();
  }

  Widget _buildEventCards() {
    return new FutureBuilder(
        future: fetchAllEvents(),
        builder: (BuildContext context, AsyncSnapshot<List<Event>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return new Scaffold(body: new Center(child: new LoadingSpinner()));
          } else {
            if (!snapshot.hasError && snapshot.data != null) {
              return new PageTransformer(
                pageViewBuilder: (context, visibilityResolver) {
                  return new PageView.builder(
                    controller: new PageController(viewportFraction: 0.85),
                    itemCount: snapshot.data.length,
                    itemBuilder: (context, index) {
                      final item = snapshot.data[index];
                      final pageVisibility = visibilityResolver
                          .resolvePageVisibility(index);
                      return new StoreConnector<AppState, VoidCallback>(
                          converter: (Store<AppState> store) =>
                              () =>
                              store.dispatch(new SetCurrentEventAction(item)),
                          builder: (BuildContext context,
                              VoidCallback setCurrentEvent) {
                            return new EventPageItem(
                              item: item,
                              pageVisibility: pageVisibility,
                              onTap: () {
                                setCurrentEvent();
                                Navigator.of(context).pushNamed(Routes.EVENT);
                              },
                            );
                          });
                    },
                  );
                },
              );
            } else {
              print(snapshot.data);
              return new Text('An error occured while loading events.');
            }
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return new FutureBuilder(
        future: isLoggedIn(),
        builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return new Scaffold(body: new Center(child: new LoadingSpinner()));
          } else {
            if (!snapshot.hasError && snapshot.data != null && snapshot.data) {
              return new Scaffold(
                appBar: new AppBar(
                  title: new Text("Events"),
                  actions: <Widget>[new IconButton(
                      icon: new Icon(FontAwesomeIcons.signOutAlt),
                      color: Colors.white,
                      onPressed: () {
                        _tokenService.clear();
                        Navigator.of(context).pushReplacementNamed(
                            Routes.LOGIN);
                      })
                  ],
                ),
                body: new Center(
                  child: new SizedBox.fromSize(child: _buildEventCards()),
                ),
              );
            } else {
              new Future.delayed(
                  new Duration(milliseconds: 1), () =>
                  Navigator.of(context).pushReplacementNamed(Routes.LOGIN));
              return new Container();
            }
          }
        });
  }
}
