import 'dart:io';

import 'package:CSGamesApp/components/bullet-point.dart';
import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class RestaurantState extends StatefulWidget {
    final Restaurant _restaurant;

    RestaurantState(this._restaurant);

    @override
    State createState() => _RestaurantPageState(_restaurant);
}

class _RestaurantPageState extends State<RestaurantState> {
    final Restaurant _restaurant;

    GoogleMapController mapController;

    _RestaurantPageState(this._restaurant);

    Widget _buildBulletPoint(String value) {
        return Padding(
            padding: EdgeInsets.fromLTRB(15.0, 10.0, 0.0, 0.0),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                    BulletPoint(7.0),
                    Expanded(
                        child: Container(
                            margin: EdgeInsets.only(right: 10),
                            child: Padding(
                                padding: EdgeInsets.fromLTRB(20.0, 0.0, 0.0, 0.0),
                                child: Text(
                                    value,
                                    softWrap: true,
                                    maxLines: 3,
                                    style: TextStyle(
                                        fontFamily: 'Montserrat',
                                        fontSize: 15.0
                                    )
                                )
                            )
                        )
                    )
                ]
            )
        );
    }

    void _close(BuildContext context) {
        Navigator.of(context).pop();
    }

    Future _clickNavigate() async {
        var url = '';
        if (Platform.isIOS) {
            url = 'http://maps.apple.com/?daddr=${_restaurant.latitude},${_restaurant.longitude}';
        } else if (Platform.isAndroid) {
            url = 'https://www.google.com/maps/search/?api=1&query=${_restaurant.latitude},${_restaurant.longitude}';
        }
        if (await canLaunch(url)) {
            await launch(url);
        } else {
            print('Cannot open the map application.');
        }
    }

    Widget _buildMap(BuildContext context) {
        return Container(
            child: Hero(
                tag: "guide-card-restaurant",
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
                                elevation: 0.0,
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
                                                            padding: EdgeInsets.all(9.0),
                                                            child: Icon(
                                                                FontAwesomeIcons.lightUtensils,
                                                                size: 24.0,
                                                                color: Constants.csLightBlue,
                                                            )
                                                        )
                                                    ),
                                                    Expanded(
                                                        child: SingleChildScrollView(
                                                            physics: ClampingScrollPhysics(),
                                                            scrollDirection: Axis.horizontal,
                                                            padding: EdgeInsets.only(left: 10.0),
                                                            child: Container(
                                                                height: 30.0,
                                                                alignment: Alignment(0.0, 0.0),
                                                                child: Text(
                                                                    LocalizationService
                                                                        .of(context)
                                                                        .eventInfo['restaurant'],
                                                                    style: TextStyle(
                                                                        color: Constants.polyhxGrey,
                                                                        fontFamily: 'Montserrat',
                                                                        fontSize: 20.0,
                                                                        fontWeight: FontWeight.w500
                                                                    ),
                                                                    overflow: TextOverflow.fade,
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    IconButton(
                                                        color: Constants.polyhxGrey,
                                                        icon: Icon(FontAwesomeIcons.times),
                                                        onPressed: () => _close(context),
                                                    )
                                                ],
                                            )
                                        ),
                                        Expanded(
                                            child: Padding(
                                                padding: EdgeInsets.only(bottom: 10.0),
                                                child: ListView(
                                                    children: _restaurant.coordinates.map((c) => _buildBulletPoint(c.info)).toList()
                                                )
                                            )
                                        ),
                                        Padding(
                                            padding: EdgeInsets.only(bottom: 10.0),
                                            child: PillButton(
                                                color: Constants.csLightBlue,
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
            child: _buildMap(context)
        );
    }
}