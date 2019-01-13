import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';

class AppTitle extends StatelessWidget {
    final String title;
    final MainAxisAlignment alignment;
    final IconData icon;

    AppTitle(this.title, this.alignment, [this.icon]);

    @override
    Widget build(BuildContext context) {
        return Padding(
            padding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
            child: Row(
                mainAxisAlignment: this.alignment,
                children: <Widget>[
                    Text(
                        title,
                        style: TextStyle(
                            fontFamily: 'OpenSans',
                            fontSize: 36.0
                        )
                    ),
                    this.icon != null ?
                    Icon(
                        this.icon,
                        size: 38.0,
                        color: Constants.polyhxRed,
                    ) : Padding(padding: EdgeInsets.all(0.0))
                ]
            )
        );
    }
}