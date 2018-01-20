import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/components/circle-gravatar.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/utils/constants.dart';

class AttendeeProfilePage extends StatelessWidget {
  static final Map<ShirtSize, String> _SHIRT_SIZE_LETTERS = {
    ShirtSize.Small: 'S',
    ShirtSize.Medium: 'M',
    ShirtSize.Large: 'L',
    ShirtSize.XLarge: 'XL',
    ShirtSize.XXLarge: 'XXL',
  };

  Attendee _attendee;
  User _user;
  RegistrationStatus _registrationStatus;
  VoidCallback onDone;
  VoidCallback onCancel;

  AttendeeProfilePage(this._attendee, this._user, this._registrationStatus, {this.onDone, this.onCancel});

  Widget _buildAvatar() {
    return new Align(
      alignment: Alignment.topCenter,
      child: new CircleGravatar(_user.username),
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
         ],
        ),
    );
  }

  Widget _buildAttendeeNameWidget() {
    return new Padding(
      padding: new EdgeInsets.only(top: 40.0),
      child: new Text('${_user.firstName} ${_user.lastName}',
          style: new TextStyle(
            color: Constants.POLYHX_GREY,
            fontSize: 24.0,
            fontWeight: FontWeight.w900,
          )
      ),
    );
  }

  Widget _buildAttendeeStatusWidget() {
    final STATUS_INFO = {
      RegistrationStatus.AwaitingConfirmation:  {
        'text': 'AWAITING CONFIRMATION',
        'color': Colors.yellow,
      },
      RegistrationStatus.Confirmed:  {
        'text': 'CONFIRMED',
        'color': Colors.green,
      },
      RegistrationStatus.Declined:  {
        'text': 'DECLINED',
        'color': Colors.red,
      },
      RegistrationStatus.NotSelected:  {
        'text': 'NOT SELECTED',
        'color': Colors.red,
      },
    };
    return new Padding(
      padding: new EdgeInsets.only(top: 20.0),
      child: new Text('Status: ${STATUS_INFO[_registrationStatus]['text']}',
          style: new TextStyle(
            color: STATUS_INFO[_registrationStatus]['color'],
            fontSize: 20.0,
            fontWeight: FontWeight.w900,
          )
      ),
    );
  }

  Widget _buildShirtSizeWidget() {
    return new Expanded(
      child: new Stack(
        alignment: Alignment.center,
        children: <Widget>[
          new Image.asset('assets/tshirt.png',
            width: 120.0,
          ),
          new Text(_SHIRT_SIZE_LETTERS[_attendee.shirtSize],
            style: new TextStyle(
              color: Constants.POLYHX_GREY,
              fontSize: 28.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDoneButton(BuildContext context) {
    return new Padding(
        padding: new EdgeInsets.only(bottom: 30.0),
        child: new Align(
          alignment: Alignment.bottomCenter,
          child: new PillButton(
            onPressed: onDone,
            child: new Padding(
              padding: new EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
              child: new Text('DONE',
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

  Widget _buildPublicIdWidget() {
    return new Padding(
        padding: new EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 20.0),
        child: new Align(
          alignment: Alignment.bottomCenter,
          child: new Column(
            children: <Widget>[
              new Padding(
                padding: new EdgeInsets.only(bottom: 10.0),
                child: new Text('Public ID:',
                  style: new TextStyle(
                    color: Constants.POLYHX_GREY,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              new Text(_attendee.publicId == null ? 'NOT ASSIGNED' : _attendee.publicId,
                style: new TextStyle(
                  color: Constants.POLYHX_GREY,
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          )
        ),
    );
  }

  Widget _buildProfileBody(BuildContext context) {
    return new Padding(
      padding: new EdgeInsets.only(top: 40.0),
      child: new Material(
        elevation: 1.0,
        borderRadius: new BorderRadius.circular(10.0),
        child: new Column(
          children: <Widget>[
            _buildConfirmationButtons(),
            _buildAttendeeNameWidget(),
            _buildAttendeeStatusWidget(),
            _buildShirtSizeWidget(),
            _buildPublicIdWidget(),
            _buildDoneButton(context),
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
        _buildProfileBody(context),
        _buildAvatar(),
      ],
    );
  }
}
