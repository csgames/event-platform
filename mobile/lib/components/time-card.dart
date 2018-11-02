import 'package:flutter/material.dart';

class TimeCard extends StatelessWidget {
  final String time;

  TimeCard(this.time);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.925,
      height: MediaQuery.of(context).size.height * 0.06,
      margin: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 5.0),
      child: Material(
        borderRadius: BorderRadius.circular(15.0),
        elevation: 0.3,
        child: Row(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(12.5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    time,
                    style: TextStyle(
                      fontSize: 17.0
                    )
                  )
                ]
              )
            )
          ]
        )
      )
    );
  }
}