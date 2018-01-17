import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/components/gravatar.dart';
import 'package:PolyHxApp/components/pillbutton.dart';
import 'package:PolyHxApp/utils/constants.dart';

class AttendeeProfilePage extends StatelessWidget {
  String _attendeeEmail;
  VoidCallback onDone;
  VoidCallback onCancel;

  AttendeeProfilePage(this._attendeeEmail, {this.onDone, this.onCancel});

  _scanForNfcBracelet() async {

  }

  Widget _buildAvatar() {
    return new Align(
        alignment: Alignment.topCenter,
        child:  new Material(
          elevation: 2.0,
          borderRadius: new BorderRadius.circular(60.0),
          child: new CircleAvatar(
            backgroundImage: new Gravatar(_attendeeEmail),
            radius: 60.0,
          ),
        ),
    );
  }

  Widget _buildConfirmationButtons() {
    return new Padding(
        padding: new EdgeInsets.symmetric(horizontal: 10.0),
        child: new Row(
          children: <Widget>[
            new Expanded(
              child: new Align(
                alignment: Alignment.topLeft,
                child: new IconButton(
                  icon: new Icon(Icons.clear),
                  iconSize: 36.0,
                  color: Colors.red,
                  onPressed: onCancel,
                ),
              ),
            ),
            new Align(
              alignment: Alignment.topRight,
              child: new IconButton(
                icon: new Icon(Icons.check),
                iconSize: 36.0,
                color: Colors.green,
                onPressed: onDone,
              ),
           ),
         ],
        ),
    );
  }

  Widget _buildAttendeeName() {
    return new Padding(
      padding: new EdgeInsets.only(top: 40.0),
      child: new Text(_attendeeEmail,
          style: new TextStyle(
            color: Constants.POLYHX_GREY,
            fontSize: 24.0,
            fontWeight: FontWeight.w900,
          )
      ),
    );
  }

  Widget _buildNfcButton() {
    return new Padding(
        padding: new EdgeInsets.only(bottom: 30.0),
        child: new Align(
          alignment: Alignment.bottomCenter,
          child: new PillButton(
            onPressed: _scanForNfcBracelet,
            child: new Padding(
              padding: new EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
              child: new Text('PAIR NFC',
                style: new TextStyle(
                    color: Colors.white,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        )
    );
  }

  Widget _buildProfileBody() {
    return new Padding(
      padding: new EdgeInsets.only(top: 40.0),
      child: new Material(
        elevation: 1.0,
        borderRadius: new BorderRadius.circular(10.0),
        child: new Column(
          children: <Widget>[
            _buildConfirmationButtons(),
            _buildAttendeeName(),
            new Expanded(
              child: new Container(),
            ),
            _buildNfcButton(),
          ],
        )
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Stack(
      fit: StackFit.expand,
      children: <Widget>[
        _buildProfileBody(),
        _buildAvatar(),
      ],
    );
  }
}
