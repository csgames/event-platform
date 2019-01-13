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

  String get language {
    return locale.languageCode;
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

  Map<String, dynamic> get eventInfo {
    return values['event-info'];
  }

  Map<String, dynamic> get bring {
    return values['bring'];
  }

  Map<String, dynamic> get parking {
    return values['parking'];
  }

  Map<String, dynamic> get restaurant {
    return values['restaurant'];
  }

  Map<String, dynamic> get hotel {
    return values['hotel'];
  }

  Map<String, dynamic> get profile {
    return values['profile'];
  }

  Map<String, dynamic> get sponsors {
    return values['sponsors'];
  }
  
  Map<String, dynamic> get schedule {
    return values['schedule'];
  }

  Map<String, dynamic> get info {
    return values['info'];
  }

  Map<String, dynamic> get notification {
    return values['notification'];
  }
}