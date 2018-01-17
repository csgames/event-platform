import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/components/pillbutton.dart';
import 'package:PolyHxApp/components/pilltextfield.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/pages/attendee-profile.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:PolyHxApp/utils/constants.dart';

class AttendeeRetrievalPage extends StatefulWidget {
  final UsersService _usersService;
  final QRCodeReader _qrCodeReader;

  AttendeeRetrievalPage(this._usersService, this._qrCodeReader);

  @override
  _AttendeeRetrievalPageState createState() => new _AttendeeRetrievalPageState(_usersService, _qrCodeReader);
}

class _AttendeeRetrievalPageState extends State<AttendeeRetrievalPage> {
  final UsersService _usersService;
  final QRCodeReader _qrCodeReader;
  User _attendee;

  _AttendeeRetrievalPageState(this._usersService, this._qrCodeReader);

  _findAttendee(String username) async {
    var user = await _usersService.getUserByUsername(username);
    if (user != null) {
      setState(() {
        _attendee = user;
      });
    }
    else {
      showDialog(context: context, child: _buildUserNotFoundDialog(username));
    }
  }

  _scanAttendee() async {
    var username = await _qrCodeReader.scan();
    _findAttendee(username);
  }

  void _clearAttendee() {
    setState(() {
      _attendee = null;
    });
  }

  Widget _buildUserNotFoundDialog(String username) {
    return new AlertDialog(
      title: new Text('Not Found'),
      content: new Text('User "$username" could not be found.'),
      actions: <Widget>[
        new FlatButton(
          child: new Text('OK',
              style: new TextStyle(
                  color: Colors.red,
                  fontSize: 18.0,
              )
          ),
          onPressed: Navigator.of(context).pop,
        ),
      ],
    );
  }

  Widget _buildSearchBar() {
    return new Padding(
      padding: new EdgeInsets.all(20.0),
      child: new PillTextField(
        keyboardType: TextInputType.emailAddress,
        onSubmitted: (username) => _findAttendee(username),
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
            new Icon(Icons.person,
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
      child: new AttendeeProfilePage(_attendee, onDone: _clearAttendee, onCancel: _clearAttendee),
    );
  }

  Widget _buildPage() {
    return _attendee != null
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