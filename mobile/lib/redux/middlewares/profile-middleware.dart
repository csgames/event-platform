import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/profile-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ProfileMiddleware extends EpicClass<AppState> {
  final TokenService _tokenService;

  ProfileMiddleware(this._tokenService);

  @override
  Stream call(Stream actions, EpicStore store) {
    return Observable(actions)
      .ofType(TypeToken<GetCurrentUserAction>())
      .switchMap((action) => _set());
  }

  Stream<dynamic> _set() async* {
    User user = _tokenService.getCurrentUser();
    yield SetCurrentUserAction(user);
  }
}