import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/components/pillbutton.dart';
import 'package:PolyHxApp/components/pilltextfield.dart';
import 'package:PolyHxApp/pages/attendee-profile.dart';
import 'package:PolyHxApp/utils/constants.dart';

class AttendeeRetrievalPage extends StatefulWidget {
  final QRCodeReader _qrCodeReader;

  AttendeeRetrievalPage(this._qrCodeReader);

  @override
  _AttendeeRetrievalPageState createState() => new _AttendeeRetrievalPageState(_qrCodeReader);
}

class _AttendeeRetrievalPageState extends State<AttendeeRetrievalPage> {
  final QRCodeReader _qrCodeReader;
  String _attendeeEmail;

  _AttendeeRetrievalPageState(this._qrCodeReader);

  _scanAttendee() async {
    var email = await _qrCodeReader.scan();
    if (email != null) {
      setState(() {
        _attendeeEmail = email;
      });
    }
  }

  void _clearAttendee() {
    setState(() {
      _attendeeEmail = null;
    });
  }

  Widget _buildSearchBar() {
    return new Padding(
      padding: new EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 0.0),
      child: new PillTextField(
        keyboardType: TextInputType.emailAddress,
        onSubmitted: (val) => _attendeeEmail = val,
        decoration: new InputDecoration(
          icon: new Icon(Icons.search, color: Constants.POLYHX_RED),
          hideDivider: true,
        ),
      ),
    );
  }

  Widget _buildNoAttendeeBody() {
    return new Expanded(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Icon(Icons.person_outline,
              size: 240.0,
              color: Constants.POLYHX_GREY.withAlpha(144),
            ),
            new Text('Register attendee',
                style: new TextStyle(
                  fontSize: 30.0,
                  fontWeight: FontWeight.w900,
                  color: Constants.POLYHX_GREY.withAlpha(144),
                )
            ),
          ],
        ),
    );
  }

  Widget _buildScanButton() {
    return new Padding(
      padding: new EdgeInsets.symmetric(vertical: 50.0),
      child: new Align(
        alignment: Alignment.bottomCenter,
        child: new PillButton(
          child: new Padding(
            padding: new EdgeInsets.fromLTRB(35.0, 10.0, 35.0, 10.0),
            child: new Icon(Icons.camera_alt,
              color: Colors.white,
              size: 40.0,
            ),
          ),
          onPressed: _scanAttendee,
        ),
      ),
    );
  }

  Widget _buildAttendeeProfile() {
    return new Padding(
      padding: new EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 20.0),
      child: new AttendeeProfilePage(_attendeeEmail, onDone: _clearAttendee, onCancel: _clearAttendee),
    );
  }

  Widget _buildPage() {
    return _attendeeEmail != null
         ? _buildAttendeeProfile()
         : new Column(
            children: <Widget>[
              _buildSearchBar(),
              _buildNoAttendeeBody(),
              _buildScanButton(),
            ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Center(
        child: _buildPage(),
    );
  }
}