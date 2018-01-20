import 'package:PolyHxApp/domain/event.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/src/material/material.dart';
import 'package:flutter/src/material/colors.dart';

class EventImage extends StatelessWidget {
  final Event _event;

  EventImage(this._event);

  @override
  Widget build(BuildContext context) {
    return new Hero(
        tag: 'event-image-${_event.id}',
        child: new Material(
            elevation: 4.0,
            borderRadius: new BorderRadius.circular(2.0),
            child: new Container(
                decoration: new BoxDecoration(
                    border: new Border.all(
                      color: Colors.white,
                      width: 2.0,
                    )),
                child: new Image.network(
                  _event.imageUrl,
                  fit: BoxFit.cover,
                  width: 250.0,
                  height: 250.0,
//                  alignment: new FractionalOffset(
//                    0.5 + (pageVisibility.pagePosition / 3),
//                    0.5,
//                  ),
                )
            )
        )
    );
  }
}