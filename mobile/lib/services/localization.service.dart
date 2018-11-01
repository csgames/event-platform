import 'package:PolyHxApp/services/resources/fr.dart';
import 'package:flutter/material.dart';
import 'package:PolyHxApp/services/resources/en.dart';

class LocalizationService {
  final Locale locale;

  LocalizationService(this.locale);

  static LocalizationService of(BuildContext context) {
    return Localizations.of<LocalizationService>(context, LocalizationService);
  }

  static Map<String, Map<String, dynamic>> _values = { 'en': en, 'fr': fr };

  Map<String, dynamic> get values {
    return _values[locale.languageCode];
  }

  String get code {
    return '${locale.languageCode}_${locale.countryCode}';
  }

  Map<String, dynamic> get eventList {
    return values['event-list'];
  }

  Map<String, dynamic> get login {
    return values['login'];
  }

  Map<String, dynamic> get event {
    return values['event'];
  }

  Map<String, dynamic> get activity {
    return values['activity'];
  }

  Map<String, dynamic> get attendeeRetrieval {
    return values['attendee-retrieval'];
  }

  Map<String, dynamic> get attendeeProfile {
    return values['attendee-profile'];
  }
}