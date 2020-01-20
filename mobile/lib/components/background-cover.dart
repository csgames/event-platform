import 'package:flutter/material.dart';

class BackgrounCover extends StatelessWidget {
  final String url;

  BackgrounCover(this.url);

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: <Widget>[
        Image.network(url, fit: BoxFit.cover),
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: FractionalOffset.bottomCenter,
              end: FractionalOffset.topCenter,
              colors: [
                const Color(0xFF000000),
                const Color(0x00000000)
              ]
            )
          )
        )
      ]
    );
  }
}