import 'package:CSGamesApp/components/bullet-point.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BringPage extends StatelessWidget {
    final Map<String, List<dynamic>> _values;

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

    Widget _buildCard(BuildContext context) {
        return Container(
            child: Hero(
                tag: "guide-card-bring",
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
                                    children: [
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
                                                                FontAwesomeIcons.lightClipboardCheck,
                                                                size: 28.0,
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
                                                                        .eventInfo['bring'],
                                                                    style: TextStyle(
                                                                        color: Constants.polyhxGrey,
                                                                        fontFamily: 'Montserrat',
                                                                        fontWeight: FontWeight.w500,
                                                                        fontSize: 20.0
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
                                                    children: _values[LocalizationService
                                                        .of(context)
                                                        .language].map((v) =>
                                                        _buildBulletPoint(v)
                                                    ).toList()
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
            child: _buildCard(context)
        );
    }
}