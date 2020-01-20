import 'package:flutter/material.dart';

class BulletPoint extends StatelessWidget {
  final double size;

  BulletPoint(this.size);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      height: size,
      width: size,
      decoration: BoxDecoration(
        color: Colors.black,
        shape: BoxShape.circle
      )
    );
  }
}