import 'package:flutter/material.dart';

class PillButton extends StatelessWidget {
  Color color;
  VoidCallback onPressed;
  Widget child;
  bool enabled;

  double elevation;

  PillButton({
    this.color,
    this.onPressed,
    this.child,
    this.enabled = true,
    this.elevation = 2.0,
  });

  @override
  Widget build(BuildContext context) {
    return new Material(
      borderRadius: new BorderRadius.circular(30.0),
      elevation: elevation,
      child: new RaisedButton(
        color: color,
        onPressed: enabled ? onPressed : null,
        child: child,
      ),
    );
  }
}