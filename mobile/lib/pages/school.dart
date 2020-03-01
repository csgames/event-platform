import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class SchoolPage extends StatelessWidget {
    final School _school;

    SchoolPage(this._school);

    void _close(BuildContext context) {
        Navigator.of(context).pop();
    }

    Widget _buildCard(BuildContext context) {
        return Container(
            child: Hero(
                tag: "guide-card-school",
                child: Container(
                    decoration: BoxDecoration(
                        color: Colors.white,
                        boxShadow: <BoxShadow>[
                            BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                offset: Offset(1.1, 1.1),
                                blurRadius: 5.0,
                            ),
                        ]
                    ),
                    margin: EdgeInsets.symmetric(horizontal: 20.0),
                    child: Stack(
                        children: <Widget>[
                            Material(
                                elevation: 0,
                                child: Column(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: <Widget>[
                                        Padding(
                                            padding: EdgeInsets.only(left: 10.0, top: 10.0),
                                            child: Row(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: <Widget>[
                                                    Container(
                                                        decoration: BoxDecoration(
                                                            color: Constants.csLightBlue.withOpacity(0.05),
                                                            shape: BoxShape.circle
                                                        ),
                                                        child: Padding(
                                                            padding: EdgeInsets.all(7.0),
                                                            child: Icon(
                                                                FontAwesomeIcons.lightMapSigns,
                                                                size: 28.0,
                                                                color: Constants.csLightBlue,
                                                            )
                                                        )
                                                    ),
                                                    Padding(
                                                        padding: EdgeInsets.only(left: 10.0),
                                                        child: Text(
                                                            LocalizationService
                                                                .of(context)
                                                                .eventInfo['school'],
                                                            style: TextStyle(
                                                                fontFamily: 'Montserrat',
                                                                color: Constants.polyhxGrey,
                                                                fontWeight: FontWeight.w500,
                                                                fontSize: 20.0
                                                            )
                                                        )
                                                    ),
                                                    Spacer(),
                                                    IconButton(
                                                        icon: Icon(FontAwesomeIcons.times),
                                                        color: Constants.polyhxGrey,
                                                        onPressed: () => _close(context),
                                                    )
                                                ]
                                            )
                                        ),
                                        Flexible(
                                            child: ListView(
                                                scrollDirection: Axis.vertical,
                                                children: _school.maps.map((m) =>
                                                    Container(
                                                        padding: EdgeInsets.only(bottom: 15.0),
                                                        child: Image.network(m)
                                                    )
                                                ).toList()
                                            )
                                        ),
                                        Padding(
                                            padding: EdgeInsets.only(bottom: 25.0, top: 10.0),
                                            child: InkWell(
                                                onTap: () =>
                                                    launch(_school.website[LocalizationService
                                                        .of(context)
                                                        .language]),
                                                child: Text(
                                                    LocalizationService
                                                        .of(context)
                                                        .eventInfo['visit'],
                                                    style: TextStyle(
                                                        fontFamily: 'Montserrat',
                                                        fontSize: 18.0,
                                                        decoration: TextDecoration.underline,
                                                        color: Constants.csBlue
                                                    )
                                                )
                                            )
                                        )
                                    ]
                                )
                            ),
                            Positioned(
                                top: 0.0,
                                child: Center(
                                    child: Container(
                                        width: 60,
                                        height: 6,
                                        child: Material(
                                            color: Constants.csBlue,
                                            child: Text('')
                                        )
                                    )
                                )
                            )
                        ]
                    ),
                )
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return Container(
            margin: EdgeInsets.only(top: 70.0 + MediaQuery
                .of(context)
                .padding
                .top, bottom: 65.0 + MediaQuery
                .of(context)
                .padding
                .bottom),
            child: _buildCard(context)
        );
    }
}