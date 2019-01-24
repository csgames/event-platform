import 'dart:io';

import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class TransportPage extends StatelessWidget {
    void _close(BuildContext context) {
        Navigator.of(context).pop();
    }

    Future _clickNavigate() async {
        var url = '';
        if (Platform.isIOS) {
            // url = 'http://maps.apple.com/?daddr=$_latitudePrincipal,$_longitudePrincipal';
        } else if (Platform.isAndroid) {
            url = 'https://www.google.com/maps/dir/H%C3%B4tels+Gouverneur+Montr%C3%A9al,+Saint+Hubert+Street,+Montreal,+QC/Polytechnique+Montr%C3%A9al,+2900+Edouard+Montpetit+Blvd,+Montreal,+QC+H3T+1J4/@45.5174678,-73.605435,14z/data=!4m14!4m13!1m5!1m1!1s0x4cc91bb29428a18d:0x84b2c38a5e2ec635!2m2!1d-73.5591572!2d45.5157006!1m5!1m1!1s0x4cc919f2a9fc4d71:0xda267ca95684133e!2m2!1d-73.6128829!2d45.504384!3e3';
        }
        if (await canLaunch(url)) {
            await launch(url);
        } else {
            print('Cannot open the map application.');
        }
    }

    Widget _buildCard(BuildContext context) {
        return Container(
            child: Hero(
                tag: "guide-card-5",
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
                                                        FontAwesomeIcons.subway,
                                                        size: 38.0,
                                                        color: Constants.csBlue,
                                                    ),
                                                    Padding(
                                                        padding: EdgeInsets.only(left: 10.0),
                                                        child: Text(
                                                            LocalizationService
                                                                .of(context)
                                                                .eventInfo['transport'].toUpperCase(),
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
                                        Padding(
                                            padding: EdgeInsets.only(left: 20.0, right: 20.0),
                                            child: Text(
                                                LocalizationService.of(context).eventInfo['transport-info'],
                                                textAlign: TextAlign.justify,
                                                style: TextStyle(
                                                    fontFamily: 'Raleway',
                                                    fontSize: 16.0,
                                                    height: 1.15
                                                )
                                            )
                                        ),
                                        Image.asset(
                                            'assets/transport.png',
                                            width: MediaQuery.of(context).size.width * 0.8
                                        ),
                                        Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                                Padding(
                                                    padding: EdgeInsets.only(left: 20.0),
                                                    child: Icon(
                                                        Icons.school,
                                                        size: 38.0,
                                                        color: Constants.csBlue
                                                    )
                                                ),
                                                Expanded(
                                                    child: Padding(
                                                        padding: EdgeInsets.only(right: 20.0, left: 20.0),
                                                        child: Text(
                                                            '2900 Edouard Montpetit Blvd, Montreal, QC H3T 1J4',
                                                            style: TextStyle(
                                                                fontFamily: 'Raleway',
                                                                fontSize: 17.0
                                                            )
                                                        )
                                                    )
                                                )
                                            ]
                                        ),
                                        Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                                Padding(
                                                    padding: EdgeInsets.only(left: 20.0),
                                                    child: Icon(
                                                        Icons.hotel,
                                                        size: 38.0,
                                                        color: Constants.csBlue
                                                    )
                                                ),
                                                Expanded(
                                                    child: Padding(
                                                        padding: EdgeInsets.only(right: 20.0, left: 20.0),
                                                        child: Text(
                                                            '1415 St Hubert St, Montreal, QC H2L 3Y9',
                                                            style: TextStyle(
                                                                fontFamily: 'Raleway',
                                                                fontSize: 17.0
                                                            )
                                                        )
                                                    )
                                                )
                                            ]
                                        ),
                                        Padding(
                                            padding: EdgeInsets.only(bottom: 10.0),
                                            child: PillButton(
                                                color: Constants.csBlue,
                                                onPressed: _clickNavigate,
                                                child: Padding(
                                                    padding: EdgeInsets.fromLTRB(16.0, 12.5, 16.0, 12.5),
                                                    child: Text(
                                                        'Directions',
                                                        style: TextStyle(
                                                            color: Colors.white,
                                                            fontWeight: FontWeight.bold,
                                                            fontSize: 20.0
                                                        )
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