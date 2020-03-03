import 'package:CSGamesApp/components/circle-gravatar.dart';
import 'package:CSGamesApp/components/pill-button.dart';
import 'package:CSGamesApp/components/shirt-size-icon.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class AttendeeProfilePage extends StatelessWidget {
    final Attendee _attendee;
    final Team _team;
    final VoidCallback onDone;
    final VoidCallback onCancel;
    final bool _doneEnabled;
    final Map<String, dynamic> _values;

    AttendeeProfilePage(this._attendee, this._team, this._doneEnabled, this._values, {this.onDone, this.onCancel});

    Widget _buildAvatar() {
        return Align(
            alignment: Alignment.topCenter,
            child: CircleGravatar(_attendee.email),
        );
    }

    Widget _buildAttendeeNameWidget() {
        return Container(
            margin: EdgeInsets.only(top: 90.0),
            padding: EdgeInsets.all(10.0),
            child: Text(
                '${_attendee.firstName} ${_attendee.lastName}',
                style: TextStyle(
                    color: Constants.csBlue,
                    fontFamily: 'Montserrat',
                    fontSize: 30.0,
                    fontWeight: FontWeight.w700
                ),
                textAlign: TextAlign.center
            )
        );
    }

    Widget _buildTeam() {
        return Text(
            '${_team.name}',
            style: TextStyle(
                color: Constants.csLightBlue,
                fontFamily: 'Montserrat',
                fontSize: 25.0,
                fontWeight: FontWeight.w400
            ),
            textAlign: TextAlign.center,
        );
    }

    Widget _buildSchool() {
        return Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
                '${_team.school.name}',
                style: TextStyle(
                    color: Constants.csBlue,
                    fontFamily: 'Montserrat',
                    fontSize: 20.0,
                    fontWeight: FontWeight.w200
                ),
                textAlign: TextAlign.center,
            )
        );
    }

    Widget _buildTransportPassWidget() {
        return Padding(
            padding: EdgeInsets.only(top: 10),
            child: Text(
                "Needs Pass : ${_attendee.needsTransportPass}",
                style: TextStyle(
                    color: _attendee.needsTransportPass ? Colors.green : Colors.red,
                    fontSize: 19.0,
                    fontWeight: FontWeight.w700
                )
            )
        );
    }

    Widget _buildShirtSizeWidget() {
        return Expanded(
            child: ShirtSizeIcon(_attendee.shirtSize)
        );
    }

    Widget _buildDoneButton() {
        return Padding(
            padding: EdgeInsets.only(bottom: 30.0),
            child: Align(
                alignment: Alignment.bottomCenter,
                child: PillButton(
                    enabled: _doneEnabled,
                    onPressed: onDone,
                    color: Constants.csBlue,
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
                        child: Text(
                            _doneEnabled ? _values['done'] : _values['scanning'],
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 18.0,
                                fontWeight: FontWeight.bold
                            )
                        )
                    )
                )
            )
        );
    }

    Widget _buildPublicIdWidget() {
        return Padding(
            padding: EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 20.0),
            child: Align(
                alignment: Alignment.bottomCenter,
                child: Column(
                    children: <Widget>[
                        Padding(
                            padding: EdgeInsets.only(bottom: 10.0),
                            child: Text(_values['id'],
                                style: TextStyle(
                                    color: Constants.polyhxGrey,
                                    fontSize: 18.0,
                                    fontWeight: FontWeight.bold
                                )
                            )
                        ),
                        Text(_attendee.publicId == null ? _values['unassigned'] : _attendee.publicId,
                            style: TextStyle(
                                color: Constants.polyhxGrey,
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold
                            )
                        )
                    ]
                )
            )
        );
    }

    Widget _buildProfileBody() {
        return Padding(
            padding: EdgeInsets.only(top: 40.0),
            child: Stack(
                children: <Widget>[
                    Container(
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
                        child: Material(
                            color: Colors.white,
                            elevation: 0.0,
                            child: Column(
                                children: <Widget>[
                                    _buildAttendeeNameWidget(),
                                    _buildTeam(),
                                    _buildSchool(),
                                    _buildTransportPassWidget(),
                                    _buildShirtSizeWidget(),
                                    _buildPublicIdWidget(),
                                    _buildDoneButton()
                                ]
                            )
                        ),
                    ),
                    Positioned(
                        top: 0.0,
                        child: Center(
                            child: Container(
                                width: 80,
                                height: 6,
                                child: Material(
                                    color: Constants.csBlue,
                                    child: Text('')
                                )
                            )
                        )
                    )
                ],
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return Stack(
            fit: StackFit.expand,
            children: <Widget>[
                _buildProfileBody(),
                _buildAvatar()
            ]
        );
    }
}
