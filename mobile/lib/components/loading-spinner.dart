import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class LoadingSpinner extends StatelessWidget {
    final _random = Random();
    final List<String> sponsors = [
        "mirego",
        "cfp",
        "bnc",
        "cse"
    ];

    int next(int min, int max) {
        return min + _random.nextInt(max - min);
    }

    @override
    Widget build(BuildContext context) {
        return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                        Column(
                            children: <Widget>[
                                SpinKitCircle(
                                    color: Colors.grey,
                                    size: 70.0,
                                ),
                                Padding(
                                    padding: const EdgeInsets.all(20.0),
                                    child: Image.asset(
                                        'assets/${sponsors[next(0, 4)]}.png',
                                        width: 120.0
                                    )
                                )
                            ]
                        )
                    ]
                )
            ]
        );
    }
}
