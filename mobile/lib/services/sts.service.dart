import 'package:CSGamesApp/utils/environment.dart';

class StsService {
  String _resource;

  StsService(this._resource);

  String get({ String path = "" }) {
    return "${Environment.stsUrl}/$_resource/$path";
  }
}
