import 'dart:io';

import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class ParkingState extends StatefulWidget {
    final Parking _parking;

    ParkingState(this._parking);

    @override
    State createState() => _ParkingPageState(_parking);
}

class _ParkingPageState extends State<ParkingState> {
    final Parking _parking;

    var showMap = false;

    GoogleMapController mapController;

    _ParkingPageState(this._parking);

    Future _onMapCreated(GoogleMapController controller) async {
        setState(() => mapController = controller);
    }

    void _close(BuildContext context) {
        setState(() => showMap = false);
        Navigator.of(context).pop();
    }

    Future _clickNavigate() async {
        var url = '';
        if (Platform.isIOS) {
            url = 'http://maps.apple.com/?daddr=${_parking.latitude},${_parking.longitude}';
        } else if (Platform.isAndroid) {
            url = 'https://www.google.com/maps/search/?api=1&query=${_parking.latitude},${_parking.longitude}';
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
                tag: "guide-card-parking",
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
                                                            padding: EdgeInsets.all(7.0),
                                                            child: Icon(
                                                                FontAwesomeIcons.lightParking,
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
                                                                .eventInfo['parking'],
                                                            style: TextStyle(
                                                                color: Constants.polyhxGrey,
                                                                fontFamily: 'Montserrat',
                                                                fontWeight: FontWeight.w500,
                                                                fontSize: 20.0
                                                            )
                                                        )
                                                    ),
                                                    Spacer(),
                                                    IconButton(
                                                        icon: Icon(FontAwesomeIcons.times),
                                                        onPressed: () => _close(context),
                                                    )
                                                ],
                                            )
                                        ),
                                        Expanded(
                                            child: Container(
                                                padding: EdgeInsets.all(5.0),
                                                child: showMap ? GoogleMap(
                                                    onMapCreated: _onMapCreated,
                                                    initialCameraPosition: CameraPosition(
                                                        target: LatLng(
                                                            _parking.latitude,
                                                            _parking.longitude
                                                        ),
                                                        zoom: _parking.zoom
                                                    ),
                                                    markers: Set<Marker>.of(_parking.coordinates.map((c) {
                                                        return Marker(
                                                            markerId: MarkerId("${c.latitude}:${c.longitude}"),
                                                            position: LatLng(c.latitude, c.longitude)
                                                        );
                                                    })),
                                                ) : Container()
                                            )
                                        ),
                                        Padding(
                                            padding: EdgeInsets.symmetric(vertical: 10.0),
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
        if (mounted && !showMap) {
            Future.delayed(Duration(milliseconds: 5), () => setState(() => showMap = true));
        }
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