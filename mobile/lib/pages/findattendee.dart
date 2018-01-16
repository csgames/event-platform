import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/utils/constants.dart';

class FindAttendeeScreen extends StatefulWidget {
  final QRCodeReader _qrCodeReader;

  FindAttendeeScreen(this._qrCodeReader);

  @override
  _FindAttendeeScreenState createState() => new _FindAttendeeScreenState(_qrCodeReader);
}

class _FindAttendeeScreenState extends State<FindAttendeeScreen> {
  final QRCodeReader _qrCodeReader;
  String _attendeeEmail = '';

  _FindAttendeeScreenState(this._qrCodeReader);

  _scanAttendee() async {
    var email = await _qrCodeReader.scan();
    setState(() {
      _attendeeEmail = email;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Center(
        child: new Column(
          children: <Widget>[
            new RaisedButton(
              child: new Icon(Icons.camera_alt, color: Constants.POLYHX_GREY),
              onPressed: _scanAttendee,
              color: Colors.white,
            ),
            new Text(_attendeeEmail),
          ],
        )
    );
  }
}