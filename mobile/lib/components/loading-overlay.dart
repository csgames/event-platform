import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class LoadingOverlay extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Center(
            child: Container(
                color: Color.fromARGB(153, 243, 243, 244),
                child: SpinKitWanderingCubes(
                    color: Constants.csLightBlue,
                    size: 70.0,
                )
            ),
        );
    }

}