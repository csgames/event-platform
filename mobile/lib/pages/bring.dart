import 'package:PolyHxApp/components/bullet-point.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BringPage extends StatelessWidget {
  final Map<String, dynamic> _values;

  BringPage(this._values);

  Widget _buildBulletPoint(String value) {
    return Padding(
      padding: EdgeInsets.fromLTRB(25.0, 20.0, 0.0, 0.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          BulletPoint(7.0),
          Padding(
            padding: EdgeInsets.fromLTRB(20.0, 0.0, 0.0, 0.0),
            child: Text(
              value,
              style: TextStyle(
                fontFamily: 'Raleway',
                fontSize: 20.0
              ) 
            )
          )
        ]
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
            _values['guide'],
            textAlign: TextAlign.left,
            style: TextStyle(
              fontSize: 40.0,
              fontFamily: 'Flipbash'
            )
          ),
          Icon(
            FontAwesomeIcons.clipboardCheck,
            size: 45.0
          )
        ],
      )
    );
  }

  Widget _buildCard(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
      child: Container(
        width: MediaQuery.of(context).size.width * 0.9,
        height: MediaQuery.of(context).size.height * 0.72,
        child: Material(
          elevation: 3.0,
          borderRadius: BorderRadius.circular(15.0),
          child: ListView(
            children: <Widget>[
              _buildBulletPoint(_values['card']),
              _buildBulletPoint(_values['pc']),
              _buildBulletPoint(_values['phone']),
              _buildBulletPoint(_values['headphones']),
              _buildBulletPoint(_values['deodorant']),
              _buildBulletPoint(_values['brush']),
              _buildBulletPoint(_values['hoodie']),
              _buildBulletPoint(_values['hygiene']),
              _buildBulletPoint(_values['sleeping']),
              _buildBulletPoint(_values['tylenol'])
            ]
          )
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
          _buildCard(context)
        ]
      ),
      resizeToAvoidBottomPadding: false
    );
  }
}