import 'package:PolyHxApp/components/event-image.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class EventInfoPage extends StatelessWidget {
  Widget _buildBackgroundCover(Event event) {
    return Stack(fit: StackFit.expand, children: <Widget>[
      Image.network(event.coverUrl, fit: BoxFit.cover),
      DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: FractionalOffset.bottomCenter,
            end: FractionalOffset.topCenter,
            colors: [
              const Color(0xFF000000),
              const Color(0x00000000),
            ],
          ),
        ),
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, Event>(
        converter: (Store<AppState> store) => store.state.currentEvent,
        builder: (BuildContext context, Event event) {
          return SingleChildScrollView(
              child: Column(
            children: <Widget>[
              Container(
                  height: MediaQuery.of(context).size.height,
                  child: Stack(children: <Widget>[
                    _buildBackgroundCover(event),
                    Center(
                        child: Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
                              EventImage(event),
                              Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child:
                                      Text(event.name, style: TextStyle(color: Colors.white, fontSize: 30.0))),
                              Padding(
                                  padding: const EdgeInsets.all(10.0),
                                  child: Text(event.details['fr'],
                                      textAlign: TextAlign.justify, style: TextStyle(color: Colors.white))),
                            ])))
                  ]))
            ],
          ));
        });
  }
}
