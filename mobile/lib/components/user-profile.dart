import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import 'gravatar.dart';

class UserProfile extends StatelessWidget {
    final Attendee _attendee;
    final Widget content;
    final Color color;
    final double elevation;
    final double opacity;
    final StackFit fit;
    final Team _team;

    UserProfile(this._attendee,
        this._team, {
            this.content,
            this.color = Colors.white,
            this.elevation = 1.0,
            this.opacity = 1.0,
            this.fit = StackFit.expand,
        });

    Widget _buildNameWidget() {
        return Padding(
            padding: EdgeInsets.all(10.0),
            child: Text(
                '${_attendee.firstName} ${_attendee.lastName}',
                style: TextStyle(
                    color: Constants.csBlue,
                    fontFamily: 'Montserrat',
                    fontSize: 20.0,
                    fontWeight: FontWeight.w700
                ),
                textAlign: TextAlign.center
            )
        );
    }

    Widget _buildTeamWidget() {
        return Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
                '${_team.school.name}',
                style: TextStyle(
                    color: Constants.csLightBlue,
                    fontFamily: 'Montserrat',
                    fontSize: 15.0,
                    fontWeight: FontWeight.w500
                ),
                textAlign: TextAlign.center,
            )
        );
    }

    Widget _buildBody() {
        return Column(
            children: <Widget>[
                _buildNameWidget(),
                _buildTeamWidget(),
                Container(
                    child: content
                )
            ]
        );
    }

    Widget _buildAvatar(BuildContext context) {
        double size = MediaQuery
            .of(context)
            .size
            .width * 0.3;
        return Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                    fit: BoxFit.fill,
                    image: NetworkImage(
                        gravatarFromEmailWithFallback(_attendee?.email),
                    )
                )
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return Container(
            margin: EdgeInsets.symmetric(horizontal: 15.0),
            child: Stack(
                children: <Widget>[
                    Container(
                        padding: EdgeInsets.all(15.0),
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
                            elevation: 0,
                            color: Colors.white,
                            child: Column(
                                children: <Widget>[
                                    _buildAvatar(context),
                                    _buildBody(),
                                ],
                            ),
                        )
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
                ]
            )
        );
    }
}
