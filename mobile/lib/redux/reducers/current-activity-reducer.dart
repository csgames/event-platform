import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/redux/actions/activity-actions.dart';
import 'package:redux/redux.dart';

final currentActivityReducer = combineReducers<Activity>([
    TypedReducer<Activity, SetCurrentActivity>(_setCurrentActivity),
    TypedReducer<Activity, PopAction>(_setNoActivity)
]);

Activity _setCurrentActivity(_, SetCurrentActivity action) {
    return action.activity;
}

Activity _setNoActivity(_, PopAction action) {
    return null;
}
