import 'package:PolyHxApp/components/eventimage.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class EventInfoPage extends StatelessWidget {
  Widget _buildBackgroundCover(Event event) {
    return new Stack(fit: StackFit.expand, children: <Widget>[
      new Image.network(event.coverUrl, fit: BoxFit.cover),
      new DecoratedBox(
        decoration: new BoxDecoration(
          gradient: new LinearGradient(
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
    return new StoreConnector<AppState, Event>(
        converter: (Store<AppState> store) => store.state.currentEvent,
        builder: (BuildContext context, Event event) {
          return new SingleChildScrollView(
              child: new Column(
            children: <Widget>[
              new Container(
                  height: MediaQuery.of(context).size.height,
                  child: new Stack(children: <Widget>[
                    _buildBackgroundCover(event),
                    new Center(
                        child: new Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: new Column(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
                              new EventImage(event),
                              new Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child:
                                      new Text(event.name, style: new TextStyle(color: Colors.white, fontSize: 30.0))),
                              new Padding(
                                  padding: const EdgeInsets.all(10.0),
                                  child: new Text(event.details['fr'],
                                      textAlign: TextAlign.justify, style: new TextStyle(color: Colors.white))),
                            ])))
                  ]))
            ],
          ));
        });
  }
}
