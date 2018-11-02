import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/domain/activity.dart';

class ActivityCard extends StatelessWidget {
  final Activity _activity;

  ActivityCard(this._activity);

  @override
  Widget build(BuildContext context) {
    String code = LocalizationService.of(context).code;
    var formatter = DateFormat.Hm(code);
    var beginHour = formatter.format(_activity.beginDate);
    var endHour = formatter.format(_activity.endDate);
    return Container(
        margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
        child: Material(
            borderRadius: BorderRadius.circular(15.0),
            elevation: 3.0,
            child: Row(
                children: <Widget>[
                  Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(_activity.name,
                                style: TextStyle(
                                    fontSize: 20.0
                                ),
                            ),
                            Padding(
                                padding: const EdgeInsets.fromLTRB(0.0, 3.0, 0.0, 0.0),
                                child: Text("$beginHour - $endHour",
                                    style: TextStyle(
                                        fontSize: 15.0
                                    ),
                                ),
                            ),
                            Padding(
                                padding: const EdgeInsets.fromLTRB(
                                    0.0, 3.0, 0.0, 0.0),
                                child: Text(_activity.location,
                                    style: TextStyle(
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