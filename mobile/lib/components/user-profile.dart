import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/components/circle-gravatar.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/utils/constants.dart';

class UserProfile extends StatelessWidget {
  User _user;
  List<Widget> children;
  Color color;
  double elevation;
  double opacity;
  StackFit fit;

  UserProfile(this._user,
      {
        this.children,
        this.color = Colors.white,
        this.elevation = 1.0,
        this.opacity = 1.0,
        this.fit = StackFit.expand,
      });

  Widget _buildNameWidget() {
    return new Center(
      child: new Padding(
        padding: new EdgeInsets.only(top: 100.0),
        child: new Text('${_user.firstName} ${_user.lastName}',
          style: new TextStyle(
            color: Constants.POLYHX_GREY,
            fontSize: 24.0,
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
    );
  }

  Widget _buildBody() {
    return new Padding(
        padding: new EdgeInsets.only(top: 40.0),
        child: new Opacity(
          opacity: opacity,
          child: new Material(
            elevation: elevation,
            borderRadius: new BorderRadius.circular(10.0),
            child: new Column(
              children: <Widget>[
                _buildNameWidget(),
              ],
            ),
          ),
        )
    );
  }

  Widget _buildAvatar() {
    return new Align(
      alignment: Alignment.topCenter,
      child: new CircleGravatar(_user.username),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Stack(
      fit: fit,
      children: <Widget>[
        _buildBody(),
        _buildAvatar(),
      ],
    );
  }
}