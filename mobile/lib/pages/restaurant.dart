import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class RestaurantPage extends StatelessWidget {
  final Map<String, dynamic> _values;

  RestaurantPage(this._values);

  Widget _buildTitle(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(22.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(
            _values['guide'],
            textAlign: TextAlign.left,
            style: TextStyle(
              fontSize: 40.0,
              fontFamily: 'Flipbash'
            )
          ),
          Icon(
            FontAwesomeIcons.utensils,
            size: 45.0
          )
        ]
      )
    );
  }

  Widget _buildMap(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
      child: Container(
        width: MediaQuery.of(context).size.width * 0.9,
        height: MediaQuery.of(context).size.height * 0.72,
        child: Material(
          elevation: 3.0,
          borderRadius: BorderRadius.circular(15.0)
        )
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          _values['title'],
          style: TextStyle(
            fontFamily: 'Raleway'
          )
        )
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          _buildTitle(context),
          _buildMap(context)
        ]
      ),
      resizeToAvoidBottomPadding: false
    );
  }
}