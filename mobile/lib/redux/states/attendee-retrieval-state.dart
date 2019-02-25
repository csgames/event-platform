import 'package:CSGamesApp/domain/attendee.dart';
import 'package:meta/meta.dart';

@immutable
class AttendeeRetrievalState {
  final bool isLoading;
  final bool hasErrors;
  final bool isScanned;
  final bool idSaved;
  final bool isInit;
  final String errorTitle;
  final String errorDescription;
  final Attendee attendee;

  AttendeeRetrievalState({
    this.isLoading,
    this.hasErrors,
    this.isScanned,
    this.idSaved,
    this.isInit,
    this.errorTitle,
    this.errorDescription,
    this.attendee
  });

  factory AttendeeRetrievalState.initial() => AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    isInit: false,
    errorTitle: '',
    errorDescription: '',
    attendee: null
  );

  factory AttendeeRetrievalState.loading() => AttendeeRetrievalState(
    isLoading: true,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    isInit: false,
    errorTitle: '',
    errorDescription: '',
    attendee: null
  );
}