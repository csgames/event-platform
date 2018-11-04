import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/pages/bring.dart';
import 'package:PolyHxApp/pages/hotel.dart';
import 'package:PolyHxApp/pages/parking.dart';
import 'package:PolyHxApp/pages/restaurant.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Tile {
  IconData icon;
  String title;
  String id;

  Tile(this.icon, this.title, this.id);
}

class EventInfoPage extends StatelessWidget {
  Map<String, dynamic> _values;
  final double _widthFactor = 0.41;
  final double _heightFactor = 0.39;

  String _getTranslation(BuildContext context, String element) {
    return _values == null ? LocalizationService.of(context).eventInfo[element] : _values[element];
  }

  void _showTileInfo(BuildContext context, String id) {
    var widget;
    switch (id) {
      case '1':
        widget = BringPage(LocalizationService.of(context).bring);
        break;
      case '2':
        widget = ParkingPage(LocalizationService.of(context).parking);
        break;
      case '3':
        widget = RestaurantPage(LocalizationService.of(context).restaurant);
        break;
      case '4':
        widget = HotelPage(LocalizationService.of(context).hotel);
        break;
    }
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => widget,
        fullscreenDialog: true
      )
    );
  }

  Widget _buildTitle(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(22.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(
            _getTranslation(context, 'title'),
            textAlign: TextAlign.left,
            style: TextStyle(
              fontSize: 40.0,
              fontFamily: 'Flipbash'
            )
          ),
          Icon(
            FontAwesomeIcons.thLarge,
            size: 45.0
          )
        ]
      )
    );
  }

  Widget _buildTile(BuildContext context, Tile tile) {
    return GestureDetector(
      onTap: () => _showTileInfo(context, tile.id),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(12.5),
            child: Container(
              width: MediaQuery.of(context).size.width * _widthFactor,
              height: MediaQuery.of(context).size.height * _heightFactor,
              child: Material(
                borderRadius: BorderRadius.circular(15.0),
                elevation: 2.0,
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.fromLTRB(0.0, 7.0, 0.0, 0.0),
                      child: Icon(
                        tile.icon,
                        size: 85.0,
                        color: Constants.polyhxRed
                      )
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(0.0, 25.0, 0.0, 0.0),
                      child: Text(
                        tile.title,
                        style: TextStyle(
                          fontSize: 22.0,
                          fontFamily: 'Raleway'
                        )
                      )
                    )
                  ]
                )
              )
            )
          )
        ]
      )
    );
  }

  Widget _buildTiles(BuildContext context) {
    return Flexible(
      child: GridView.count(
        crossAxisCount: 2,
        padding: EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 10.0),
        mainAxisSpacing: 4.0,
        crossAxisSpacing: 4.0,
        children: [
          Tile(
            FontAwesomeIcons.clipboardCheck,
            _getTranslation(context, 'bring'),
            '1'
          ),
          Tile(
            FontAwesomeIcons.parking,
            _getTranslation(context, 'parking'),
            '2'
          ),
          Tile(
            FontAwesomeIcons.utensils,
            _getTranslation(context, 'restaurant'),
            '3'
          ),
          Tile(
            Icons.hotel,
            _getTranslation(context, 'hotel'),
            '4'
          )
        ].map((Tile tile) => _buildTile(context, tile)).toList()
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, Event>(
      onInit: (_) => _values = LocalizationService.of(context).eventInfo,
      converter: (store) => store.state.currentEvent,
      builder: (BuildContext context, Event event) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            _buildTitle(context),
            _buildTiles(context)
          ]
        );
      }
    );
  }
}
