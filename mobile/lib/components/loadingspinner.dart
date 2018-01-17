import 'package:flutter/widgets.dart';
import 'package:flutter/src/material/progress_indicator.dart';

class LoadingSpinner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[new CircularProgressIndicator()])
        ]);
  }
}
