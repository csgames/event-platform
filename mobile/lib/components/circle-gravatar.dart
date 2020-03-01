import 'package:CSGamesApp/components/gravatar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CircleGravatar extends StatelessWidget {
  final String _username;
  final double elevation;
  final double radius;

  CircleGravatar(this._username, {this.elevation = 2.0, this.radius = 60.0});

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: elevation,
      borderRadius: BorderRadius.circular(radius),
      child: CircleAvatar(
        backgroundImage: NetworkImage(
          gravatarFromEmailWithFallback(_username),
        ),
        radius: radius,
      ),
    );
  }
}
