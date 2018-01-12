import 'package:PolyHxApp/services/token.service.dart';
import 'package:http/http.dart';


class EventManagementService {
  Client _http;
  TokenService _tokenService;

  EventManagementService(this._http, this._tokenService) {

  }
}