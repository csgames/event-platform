import 'package:flutter/material.dart';

class PillButton extends StatelessWidget {
  final Color color;
  final VoidCallback onPressed;
  final Widget child;
  final bool enabled;

  final double elevation;

  PillButton({
    this.color,
    this.onPressed,
    this.child,
    this.enabled = true,
    this.elevation = 1.0
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      borderRadius: BorderRadius.circular(20.0),
      elevation: elevation,
      child: RaisedButton(
        color: color,
        onPressed: enabled ? onPressed : null,
        child: child,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0))
      )
    );
  }
}