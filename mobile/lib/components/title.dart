import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';

class AppTitle extends StatelessWidget {
    final String title;
    final MainAxisAlignment alignment;
    final IconData icon;

    AppTitle(this.title, this.alignment, [this.icon]);

    @override
    Widget build(BuildContext context) {
        return SingleChildScrollView(
            physics: ClampingScrollPhysics(),
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
            child: Row(
                mainAxisAlignment: this.alignment,
                children: <Widget>[
                    Text(
                        title.toUpperCase(),
                        style: TextStyle(
                            fontFamily: 'flipbash',
                            fontSize: 30.0
                        )
                    ),
                    this.icon != null ?
                    Icon(
                        this.icon,
                        size: 38.0,
                        color: Constants.csRed,
                    ) : Padding(padding: EdgeInsets.all(0.0))
                ]
            )
        );
    }
}