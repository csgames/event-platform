import 'package:CSGamesApp/utils/environment.dart';

class CSGamesApi {
    final String _apiUrl = Environment.apiUrl;
    final String _path;

    CSGamesApi(this._path);

    String url([route = ""]) {
        return '$_apiUrl/$_path/$route';
    }
}