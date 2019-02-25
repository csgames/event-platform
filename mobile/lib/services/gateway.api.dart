import 'package:CSGamesApp/utils/environment.dart';

class GatewayApi {
    final String _apiUrl = Environment.gatewayUrl;

    String url([route = ""]) {
        return '$_apiUrl/$route';
    }
}