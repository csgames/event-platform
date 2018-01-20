import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/domain/activity.dart';

class ActivityCard extends StatelessWidget {
  final Activity _activity;

  ActivityCard(this._activity);

  @override
  Widget build(BuildContext context) {
    var formatter = new DateFormat.Hm('en_US');
    var beginHour = formatter.format(_activity.beginDate);
    var endHour = formatter.format(_activity.endDate);
    return new Container(
        margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
        child: new Material(
            elevation: 3.0,
            child: new Row(
                children: <Widget>[
                  new Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: new Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            new Text(_activity.name,
                                style: new TextStyle(
                                    fontSize: 20.0
                                ),
                            ),
                            new Padding(
                                padding: const EdgeInsets.fromLTRB(0.0, 3.0, 0.0, 0.0),
                                child: new Text("$beginHour - $endHour",
                                    style: new TextStyle(
                                        fontSize: 15.0
                                    ),
                                ),
                            ),
                            new Padding(
                                padding: const EdgeInsets.fromLTRB(
                                    0.0, 3.0, 0.0, 0.0),
                                child: new Text(_activity.location,
                                    style: new TextStyle(
                                        fontWeight: FontWeight.w100,
                                        fontSize: 15.0
                                    ),
                                ),
                            ),
                          ],
                      ),
                  ),
                ],
            ),
        ),
    );
  }
}