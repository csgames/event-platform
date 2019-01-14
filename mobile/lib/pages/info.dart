import 'dart:ui';

import 'package:CSGamesApp/components/event-image.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';

class InfoPage extends StatelessWidget {
    final Event _event;

    InfoPage(this._event);

    Widget _buildInfo(BuildContext context) {
        return LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) {
                return ConstrainedBox(
                    constraints: BoxConstraints(minHeight: constraints.maxHeight),
                    child: SingleChildScrollView(
                        child: Column(
                            children: [
                                Container(
                                    padding: EdgeInsets.only(top: 20.0),
                                    child: EventImage(_event, size: 200)
                                ),
                                Text(
                                    _event.name,
                                    style: TextStyle(
                                        fontSize: 40.0,
                                        fontFamily: "OpenSans",
                                        color: Colors.white
                                    ),
                                ),
                                Padding(
                                    padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 10.0),
                                    child: Material(
                                        elevation: 2.0,
                                        color: Colors.white30,
                                        borderRadius: BorderRadius.circular(15.0),
                                        child: Padding(
                                            padding: EdgeInsets.all(10.0),
                                            child: Column(
                                                children: <Widget>[
                                                    Text(
                                                        _event.details[LocalizationService
                                                            .of(context)
                                                            .language],
                                                        textAlign: TextAlign.justify,
                                                        style: TextStyle(
                                                            color: Colors.white,
                                                            fontFamily: 'OpenSans',
                                                            fontSize: 15.0,
                                                            height: 1.15
                                                        )
                                                    )
                                                ]
                                            )
                                        )
                                    )
                                )
                            ]
                        )
                    )
                );
            });
    }

    @override
    Widget build(BuildContext context) {
        return Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                    colorFilter: ColorFilter.mode(Colors.black54, BlendMode.darken),
                    image: NetworkImage(_event.coverUrl),
                    fit: BoxFit.cover,
                ),
            ),
            child: _buildInfo(context)
        );
    }
}