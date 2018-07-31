import 'package:PolyHxApp/domain/event.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EventImage extends StatelessWidget {
  final Event _event;

  EventImage(this._event);

  @override
  Widget build(BuildContext context) {
    return Hero(
        tag: 'event-image-${_event.id}',
        child: Material(
            elevation: 4.0,
            borderRadius: BorderRadius.circular(2.0),
            child: Container(
                decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.white,
                      width: 2.0,
                    )),
                child: Image.network(
                  _event.imageUrl,
                  fit: BoxFit.cover,
                  width: 250.0,
                  height: 250.0,
//                  alignment: FractionalOffset(
//                    0.5 + (pageVisibility.pagePosition / 3),
//                    0.5,
//                  ),
                )
            )
        )
    );
  }
}