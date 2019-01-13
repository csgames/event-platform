import 'dart:io';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class ParkingState extends StatefulWidget {
    @override
    State createState() => _ParkingPageState();
}

class _ParkingPageState extends State<ParkingState> {
    final _latitudePrincipal = 45.5054887;
    final _longitudePrincipal = -73.6132495;
    final _iosOffsetX = -0.0015;
    final _iosOffsetY = 0.001;

    var showMap = false;

    GoogleMapController mapController;

    _ParkingPageState();

    Future _onMapCreated(GoogleMapController controller) async {
        setState(() => mapController = controller);

        mapController.addMarker(
            MarkerOptions(
                position: LatLng(_latitudePrincipal, _longitudePrincipal),
                infoWindowText: InfoWindowText("Pavillon principal", "Payant"),

            )
        );
    }

    void _close(BuildContext context) {
        setState(() => showMap = false);
        Future.delayed(Duration(milliseconds: 10), () => Navigator.of(context).pop());
    }

    Future _clickNavigate() async {
        var url = '';
        if (Platform.isIOS) {
            url = 'http://maps.apple.com/?daddr=$_latitudePrincipal,$_longitudePrincipal';
        } else if (Platform.isAndroid) {
            url = 'https://www.google.com/maps/search/?api=1&query=École+Polytechnique+de+Montréal';
        }
        if (await canLaunch(url)) {
            await launch(url);
        } else {
            print('Cannot open the map application.');
        }
    }

    Widget _buildMap(BuildContext context) {
        return Padding(
            padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
            child: Hero(
                tag: "guide-card-2",
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
                                            FontAwesomeIcons.parking,
                                            size: 38.0,
                                            color: Constants.polyhxRed,
                                        ),
                                        Padding(
                                            padding: EdgeInsets.only(left: 10.0),
                                            child: Text(
                                                LocalizationService
                                                    .of(context)
                                                    .eventInfo['parking'],
                                                style: TextStyle(
                                                    fontFamily: 'OpenSans',
                                                    fontSize: 24.0
                                                )
                                            )
                                        ),
                                        Spacer(),
                                        IconButton(
                                            icon: new Icon(FontAwesomeIcons.times),
                                            onPressed: () => _close(context),
                                        )
                                    ],
                                )
                            ),
                            Center(
                                child: SizedBox(
                                    width: MediaQuery
                                        .of(context)
                                        .size
                                        .width * 0.77,
                                    height: MediaQuery
                                        .of(context)
                                        .size
                                        .height * 0.50,
                                    child: showMap ? GoogleMap(
                                        onMapCreated: _onMapCreated,
                                        options: GoogleMapOptions(
                                            cameraPosition: CameraPosition(
                                                target: LatLng(
                                                    _latitudePrincipal + (Platform.isIOS ? _iosOffsetY : 0),
                                                    _longitudePrincipal + (Platform.isIOS ? _iosOffsetX : 0)
                                                ),
                                                zoom: 17.0
                                            ),
                                        ),
                                    ) : Container()
                                )
                            ),
                            Padding(
                                padding: EdgeInsets.only(bottom: 10.0),
                                child: PillButton(
                                    color: Constants.polyhxRed,
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