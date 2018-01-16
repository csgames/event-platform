import 'dart:async';

import 'package:PolyHxApp/components/eventimage.dart';
import 'package:PolyHxApp/components/loadingspinner.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/services/event-management.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EventDetails extends StatelessWidget {
  final EventManagementService _eventManagementService;
  final String _eventId;

  EventDetails(this._eventManagementService, this._eventId);

  @override
  Widget build(BuildContext context) {
    var event = _eventManagementService.getEventByIdFromCache(_eventId);
    return new Scaffold(
        appBar: new AppBar(title: new Text(event.name)),
        body: new Column(
          children: <Widget>[new EventImage(event)],
        ),
    );
  }
}
