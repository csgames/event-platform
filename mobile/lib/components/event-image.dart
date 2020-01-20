import 'package:CSGamesApp/domain/event.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EventImage extends StatelessWidget {
    final Event _event;
    double size = 250.0;

    EventImage(this._event, {this.size});

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
                        width: size,
                        height: size
                    )
                )
            )
        );
    }
}