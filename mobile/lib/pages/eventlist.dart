import 'dart:async';

import 'package:PolyHxApp/components/pagetransformer/eventpageitem.dart';
import 'package:PolyHxApp/components/pagetransformer/pagetransformer.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/services/event-management.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EventList extends StatelessWidget {
  final TokenService _tokenService;
  final EventManagementService _eventManagementService;

  EventList(this._tokenService, this._eventManagementService);

  Future<bool> isLoggedIn() async {
    return _tokenService.validateTokens();
  }

  @override
  Widget build(BuildContext context) {
    return new FutureBuilder(
        future: isLoggedIn(),
        builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return new Text('Awaiting result...');
            default:
              if (!snapshot.hasError && snapshot.data) {
                return new Scaffold(
                  appBar: new AppBar(
                    title: new Text("Events"),
                    leading: new IconButton(
                        icon: new Icon(Icons.view_headline),
                        color: Colors.white,
                        onPressed: null),
                  ),
                  body: new Center(
                    child: new SizedBox.fromSize(
                      size: const Size.fromHeight(500.0),
                      child: new PageTransformer(
                        pageViewBuilder: (context, visibilityResolver) {
                          return new PageView.builder(
                            controller:
                                new PageController(viewportFraction: 0.85),
                            itemCount: 2,
                            itemBuilder: (context, index) {
                              final item = new Event(
                                  name: "Hackatown 2018",
                                  coverUrl: "https://i.imgur.com/VwtbfRu.jpg",
                                  imageUrl: "https://i.imgur.com/53HXN2a.png");
                              final pageVisibility = visibilityResolver
                                  .resolvePageVisibility(index);

                              return new EventPageItem(
                                item: item,
                                pageVisibility: pageVisibility,
                              );
                            },
                          );
                        },
                      ),
                    ),
                  ),
                );
              } else {
                new Future.delayed(new Duration(milliseconds: 1),
                    () => Navigator.of(context).pushReplacementNamed('/login'));
                return new Container();
              }
          }
        });
  }
}
