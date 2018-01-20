import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/components/gravatar.dart';

class CircleGravatar extends StatelessWidget {
  String _username;
  double elevation;
  double radius;

  CircleGravatar(this._username, { this.elevation = 2.0, this.radius = 60.0 });

  @override
  Widget build(BuildContext context) {
    return new Material(
      elevation: elevation,
      borderRadius: new BorderRadius.circular(radius),
      child: new CircleAvatar(
        backgroundImage: new Gravatar(_username),
        radius: radius,
      ),
    );
  }
}