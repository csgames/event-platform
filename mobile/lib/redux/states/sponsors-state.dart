import 'package:PolyHxApp/domain/sponsors.dart';
import 'package:meta/meta.dart';

@immutable
class SponsorsState {
  final Map<String, List<Sponsors>> sponsors;
  final bool isLoading;
  final bool hasErrors;

  SponsorsState({this.isLoading, this.hasErrors, this.sponsors});

  factory SponsorsState.initial() => SponsorsState(sponsors: {}, isLoading: false, hasErrors: false);

  factory SponsorsState.loading() => SponsorsState(sponsors: {}, isLoading: true, hasErrors: false);

  factory SponsorsState.error() => SponsorsState(sponsors: {}, isLoading: false, hasErrors: false);
}