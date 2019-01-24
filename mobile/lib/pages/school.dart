import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class SchoolPage extends StatelessWidget {
    void _close(BuildContext context) {
        Navigator.of(context).pop();
    }

    Widget _buildCard(BuildContext context) {
        String url = LocalizationService.of(context).code == 'en'
            ? 'https://www.polymtl.ca/renseignements-generaux/${LocalizationService.of(context).code}/contact-information-access-maps/campus-map'
            : 'https://www.polymtl.ca/renseignements-generaux/coordonnees-et-plans-dacces/plans-du-campus';
        return Container(
            child: Hero(
                tag: "guide-card-6",
                child: Stack(
                    children: <Widget>[
                        Positioned(
                            top: 17.0,
                            left: 9.0,
                            child: Center(
                                child: Container(
                                    width: 20,
                                    height: 60,
                                    decoration: BoxDecoration(
                                        boxShadow: [
                                            BoxShadow(
                                                color: Colors.black12,
                                                blurRadius: 4.0,
                                                offset: Offset(0, 1),
                                                spreadRadius: 0.0
                                            )
                                        ]
                                    ),
                                    child: Material(
                                        borderRadius: BorderRadius.circular(10.0),
                                        color: Constants.csBlue,
                                        child: Text('')
                                    )
                                )
                            )
                        ),
                        Padding(
                            padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
                            child: Material(
                                elevation: 2.0,
                                borderRadius: BorderRadius.circular(15.0),
                                child: Column(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: <Widget>[
                                        Padding(
                                            padding: EdgeInsets.only(left: 10.0),
                                            child: Row(
                                                crossAxisAlignment: CrossAxisAlignment.end,
                                                children: <Widget>[
                                                    Icon(
                                                        FontAwesomeIcons.mapSigns,
                                                        size: 38.0,
                                                        color: Constants.csBlue,
                                                    ),
                                                    Padding(
                                                        padding: EdgeInsets.only(left: 10.0),
                                                        child: Text(
                                                            LocalizationService
                                                                .of(context)
                                                                .eventInfo['school'].toUpperCase(),
                                                            style: TextStyle(
                                                                fontFamily: 'flipbash',
                                                                fontSize: 24.0
                                                            )
                                                        )
                                                    ),
                                                    Spacer(),
                                                    IconButton(
                                                        icon: Icon(FontAwesomeIcons.times),
                                                        onPressed: () => _close(context),
                                                    )
                                                ]
                                            )
                                        ),
                                        Text(
                                            LocalizationService.of(context).eventInfo['campus'],
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                                fontFamily: 'Raleway',
                                                fontSize: 18.0
                                            )
                                        ),
                                        Image.asset(
                                            'assets/campus.png',
                                            width: MediaQuery.of(context).size.width * 0.85
                                        ),
                                        Text(
                                            LocalizationService.of(context).eventInfo['map'],
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                                fontFamily: 'Raleway',
                                                fontSize: 18.0
                                            )
                                        ),
                                        Image.asset(
                                            'assets/school.png',
                                            width: MediaQuery.of(context).size.width * 0.85
                                        ),
                                        Padding(
                                            padding: EdgeInsets.only(bottom: 25.0, top: 10.0),
                                            child: InkWell(
                                                onTap: () => launch(url),
                                                child: Text(
                                                    LocalizationService.of(context).eventInfo['visit'],
                                                    style: TextStyle(
                                                        fontFamily: 'Raleway',
                                                        fontSize: 18.0,
                                                        decoration: TextDecoration.underline,
                                                        color: Colors.blue
                                                    )
                                                )
                                            )
                                        )
                                    ]
                                )
                            )
                        )
                    ]
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
            child:  _buildCard(context)
        );
    }
}