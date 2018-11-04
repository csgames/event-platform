import 'package:PolyHxApp/components/gravatar.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/profile-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:redux/redux.dart';

class ProfilePage extends StatelessWidget {
  Map<String, dynamic> _values;

  String _getTranslation(BuildContext context, String element) {
    return _values == null ? LocalizationService.of(context).profile[element] : _values[element];
  }

  Widget _buildTitle(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(22.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Text(
            _getTranslation(context, 'title'),
            style: TextStyle(
              fontFamily: 'Flipbash',
              fontSize: 40.0
            )
          )
        ]
      )
    );
  }

  Widget _buildAvatar(_ProfilePageViewModel model) {
    return Container(
      width: 180.0,
      height: 180.0,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          fit: BoxFit.fill,
          image: Gravatar(model.user.username)
        )
      )
    );
  }

  Widget _buildName(_ProfilePageViewModel model) {
    return Padding(
      padding: EdgeInsets.all(10.0),
      child: Text(
        '${model.user.firstName} ${model.user.lastName}',
        style: TextStyle(
          fontFamily: 'Raleway',
          fontSize: 40.0
        )
      )
    );
  }

  Widget _buildQR(_ProfilePageViewModel model) {
    return QrImage(
      data: model.user.username,
      size: 180.0
    );
  }

  Widget _buildButton(BuildContext context, _ProfilePageViewModel model) {
    return Padding(
      padding: EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),
      child: PillButton(
        onPressed: () => model.scan(),
          child: Padding(
            padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
            child: Text(
            _getTranslation(context, 'scan'),
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 20.0
            )
          )
        )
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _ProfilePageViewModel>(
      onInit: (_) => _values = LocalizationService.of(context).profile,
      converter: (store) => _ProfilePageViewModel.fromStore(store),
      builder: (BuildContext _, _ProfilePageViewModel model) {
        return Column(
          children: <Widget>[
            _buildTitle(context),
            _buildAvatar(model),
            _buildName(model),
            _buildQR(model),
            _buildButton(context, model)
          ]
        );
      }
    );
  }
}

class _ProfilePageViewModel {
  User user;
  Function scan;

  _ProfilePageViewModel(this.user, this.scan);

  _ProfilePageViewModel.fromStore(Store<AppState> store) {
    user = store.state.currentUser;
    scan = () => store.dispatch(ScanAction());
  }
}