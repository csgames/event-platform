import 'dart:io';

import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class HotelState extends StatefulWidget {
    final Hotel _hotel;

    HotelState(this._hotel);

    @override
    State createState() => _HotelPageState(_hotel);
}

class _HotelPageState extends State<HotelState> {
    final Hotel _hotel;

    var showMap = false;

    GoogleMapController mapController;

    _HotelPageState(this._hotel);

    Future _onMapCreated(GoogleMapController controller) async {
        setState(() => mapController = controller);
    }

    void _close(BuildContext context) {
        setState(() => showMap = false);
        Future.delayed(Duration(milliseconds: 10), () => Navigator.of(context).pop());
    }

    Future _clickNavigate() async {
        var url = '';
        if (Platform.isIOS) {
            url = 'http://maps.apple.com/?daddr=${_hotel.latitude},${_hotel.longitude}';
        } else if (Platform.isAndroid) {
            url = 'https://www.google.com/maps/search/?api=1&query=${_hotel.latitude},${_hotel.longitude}';
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
                tag: 'guide-card-hotel',
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
                                                            padding: EdgeInsets.all(11.0),
                                                            child: Icon(
                                                                FontAwesomeIcons.lightBed,
                                                                size: 20.0,
                                                                color: Constants.csLightBlue,
                                                            )
                                                        )
                                                    ),
                                                    Padding(
                                                        padding: EdgeInsets.only(left: 10.0),
                                                        child: Text(
                                                            LocalizationService
                                                                .of(context)
                                                                .eventInfo['hotel'],
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
                                                            _hotel.latitude,
                                                            _hotel.longitude
                                                        ),
                                                        zoom: _hotel.zoom
                                                    ),
                                                    markers: Set.of([
                                                        Marker(
                                                            markerId: MarkerId("hotel"),
                                                            position: LatLng(_hotel.latitude, _hotel.longitude)
                                                        )
                                                    ]),
                                                ) : Container()
                                            )
                                        ),
                                        Padding(
                                            padding: const EdgeInsets.symmetric(vertical: 10.0),
                                            child: Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: <Widget>[
                                                    Padding(
                                                        padding: EdgeInsets.only(left: 20.0),
                                                        child: Icon(
                                                            FontAwesomeIcons.lightMapMarkerAlt,
                                                            size: 30.0,
                                                            color: Constants.polyhxGrey
                                                        )
                                                    ),
                                                    Expanded(
                                                        child: Padding(
                                                            padding: EdgeInsets.symmetric(horizontal: 10.0),
                                                            child: Column(
                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                children: [
                                                                    Text(
                                                                        _hotel.name,
                                                                        style: TextStyle(
                                                                            color: Constants.polyhxGrey,
                                                                            fontWeight: FontWeight.w600,
                                                                            fontFamily: 'Montserrat',
                                                                            fontSize: 18.0
                                                                        )
                                                                    ),
                                                                    Text(
                                                                        _hotel.address,
                                                                        style: TextStyle(
                                                                            fontFamily: 'Montserrat',
                                                                            fontSize: 13.0,
                                                                            color: Constants.polyhxGrey,
                                                                            fontWeight: FontWeight.w400
                                                                        )
                                                                    )
                                                                ]
                                                            )
                                                        )
                                                    )
                                                ]
                                            ),
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