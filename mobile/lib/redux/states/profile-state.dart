import 'package:meta/meta.dart';

@immutable
class ProfileState {
  final bool isScanned;
  final bool hasErrors;
  final String errorTitle;
  final String errorDescription;

  ProfileState({
    this.isScanned,
    this.hasErrors,
    this.errorTitle,
    this.errorDescription
  });

  factory ProfileState.initial() => ProfileState(isScanned: false, hasErrors: false, errorTitle: null, errorDescription: null);

  factory ProfileState.scanned() => ProfileState(isScanned: true, hasErrors: false, errorTitle: null, errorDescription: null);
}