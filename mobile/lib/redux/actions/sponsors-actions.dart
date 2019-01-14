import 'package:CSGamesApp/domain/sponsors.dart';

class LoadSponsorsAction {
  String eventId;

  LoadSponsorsAction(this.eventId);
}

class SponsorsLoadedAction {
  final Map<String, List<Sponsors>> sponsors;

  SponsorsLoadedAction(this.sponsors);
}

class SponsorsNotLoadedAction {}

class ResetSponsorsAction {}