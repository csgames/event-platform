import 'dart:async';

import 'package:PolyHxApp/components/eventimage.dart';
import 'package:PolyHxApp/components/loadingspinner.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/event-management.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class EventDetails extends StatelessWidget {
  final EventManagementService _eventManagementService;

  EventDetails(this._eventManagementService);

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, Event>(
      converter: (Store<AppState> store) => store.state.currentEvent,
      builder: (BuildContext context, Event event) {
        return new Scaffold(
            appBar: new AppBar(title: new Text(event.name)),
            body: new Column(
              children: <Widget>[new EventImage(event)],
            ));
      },
    );
  }
}
