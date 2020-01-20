import 'package:CSGamesApp/domain/guide.dart';

class LoadGuideAction {}

class GuideLoadedAction {
    final Guide guide;

    GuideLoadedAction(this.guide);
}

class GuideNotLoadedAction {}

class InitGuideAction {}
