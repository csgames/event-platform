import 'package:CSGamesApp/domain/sponsors.dart';

class LoadSponsorsAction {}

class SponsorsLoadedAction {
  final Map<String, List<Sponsors>> sponsors;

  SponsorsLoadedAction(this.sponsors);
}

class SponsorsNotLoadedAction {}

class ResetSponsorsAction {}