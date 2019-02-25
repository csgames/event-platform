import 'package:CSGamesApp/domain/guide.dart';
import 'package:meta/meta.dart';

@immutable
class GuideState {
    final Guide guide;
    final bool isLoading;
    final bool hasErrors;

    GuideState({this.guide, this.isLoading, this.hasErrors});

    factory GuideState.initial() => GuideState(guide: null, isLoading: false, hasErrors: false);

    factory GuideState.loading() => GuideState(guide: null, isLoading: true, hasErrors: false);

    factory GuideState.error() => GuideState(guide: null, isLoading: false, hasErrors: true);
}