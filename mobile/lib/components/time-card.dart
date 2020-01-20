import 'package:flutter/material.dart';

class TimeCard extends StatelessWidget {
  final String time;

  TimeCard(this.time);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.925,
      margin: EdgeInsets.fromLTRB(0.0, 2.0, 0.0, 2.0),
      child: Material(
        borderRadius: BorderRadius.circular(10.0),
//        color: Color.fromARGB(255, 230, 230, 230),
        child: Row(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(12.5, 5.0, 12.5, 5.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    time,
                    style: TextStyle(
                      fontSize: 12.0,
                      fontFamily: 'OpenSans'
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