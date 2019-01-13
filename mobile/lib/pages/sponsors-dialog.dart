import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/domain/sponsors.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SponsorsDialog extends StatelessWidget {
    final Sponsors _sponsors;

    SponsorsDialog(this._sponsors);

    Widget _buildLogo(BuildContext context) {
        return Padding(
            padding: EdgeInsets.only(top: 10.0),
            child: Image.network(
                _sponsors.imageUrl,
                width: MediaQuery
                    .of(context)
                    .size
                    .width * 0.6,
                height: MediaQuery
                    .of(context)
                    .size
                    .height * 0.1
            )
        );
    }

    Widget _buildText(BuildContext context) {
        return Expanded(
            child: ListView(
                shrinkWrap: true,
                padding: EdgeInsets.fromLTRB(25.0, 5.0, 25.0, 10.0),
                children: <Widget>[
                    Text(
                        _sponsors.description[ LocalizationService
                            .of(context)
                            .language],
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                            fontFamily: 'Raleway',
                            fontSize: 15.0,
                            height: 1.15
                        )
                    )
                ]
            )
        );
    }

    Widget _buildHyperlink() {
        return Padding(
            padding: EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 15.0),
            child: InkWell(
                onTap: () => launch(_sponsors.website),
                child: Text(
                    _sponsors.website,
                    style: TextStyle(
                        fontFamily: 'Raleway',
                        fontSize: 18.0,
                        decoration: TextDecoration.underline,
                        color: Colors.blue
                    )
                )
            )
        );
    }

    Widget _buildButton(BuildContext context) {
        return PillButton(
            onPressed: () => Navigator.pop(context),
            child: Padding(
                padding: EdgeInsets.fromLTRB(16.0, 12.5, 16.0, 12.5),
                child: Text(
                    LocalizationService
                        .of(context)
                        .sponsors['done'],
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20.0
                    )
                )
            )
        );
    }

    Widget _buildBody(BuildContext context) {
        return Stack(
            fit: StackFit.expand,
            children: <Widget>[
                Material(
                    elevation: 1.0,
                    borderRadius: BorderRadius.circular(10.0),
                    child: Container(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: <Widget>[
                                _buildLogo(context),
                                _buildText(context),
                                _buildHyperlink(),
                                _buildButton(context)
                            ]
                        )
                    )
                )
            ]
        );
    }


    @override
    Widget build(BuildContext context) {
        return Center(
            child: Container(
                margin: EdgeInsets.only(
                    right: 20.0,
                    left: 20.0,
                    top: 70.0 + MediaQuery
                        .of(context)
                        .padding
                        .top,
                    bottom: 65.0 + MediaQuery
                        .of(context)
                        .padding
                        .bottom),
                child: _buildBody(context)
            )
        );
    }
}