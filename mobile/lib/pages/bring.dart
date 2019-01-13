import 'package:PolyHxApp/components/bullet-point.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BringPage extends StatelessWidget {
    final Map<String, dynamic> _values;

    BringPage(this._values);

    void _close(BuildContext context) {
        Navigator.of(context).pop();
    }

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
                                        fontFamily: 'OpenSans',
                                        fontSize: 18.0
                                    )
                                ),
                            )

                        )
                    )
                ]
            )
        );
    }

    Widget _buildCard(BuildContext context) {
        return Padding(
            padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
            child: Hero(
                tag: "guide-card-1",
                child: Material(
                    elevation: 2.0,
                    borderRadius: BorderRadius.circular(15.0),
                    child: Column(
                        children: [
                            Padding(
                                padding: EdgeInsets.only(left: 10.0),
                                child: Row(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: <Widget>[Icon(
                                        FontAwesomeIcons.clipboardCheck,
                                        size: 38.0,
                                        color: Constants.polyhxRed,
                                    ),
                                    Padding(
                                        padding: EdgeInsets.only(left: 10.0),
                                        child: Text(
                                            LocalizationService
                                                .of(context)
                                                .eventInfo['bring'],
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
                                )),
                            Expanded(
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
                        ]
                    )
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