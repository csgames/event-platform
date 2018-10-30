import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:meta/meta.dart';

@immutable
class AttendeeRetrievalState {
  final bool isLoading;
  final bool hasErrors;
  final bool isScanned;
  final bool idSaved;
  final bool statusSaved;
  final String errorTitle;
  final String errorDescription;
  final Attendee attendee;
  final User user;

  AttendeeRetrievalState({
    this.isLoading,
    this.hasErrors,
    this.isScanned,
    this.idSaved,
    this.statusSaved,
    this.errorTitle,
    this.errorDescription,
    this.attendee,
    this.user
  });

  factory AttendeeRetrievalState.initial() => AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    statusSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: null,
    user: null
  );

  factory AttendeeRetrievalState.loading() => AttendeeRetrievalState(
    isLoading: true,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    statusSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: null,
    user: null
  );
}