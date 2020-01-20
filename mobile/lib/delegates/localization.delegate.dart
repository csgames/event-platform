import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class LanguageDelegate extends LocalizationsDelegate<LocalizationService> {
  const LanguageDelegate();

  @override
  bool isSupported(Locale locale) => ['en', 'fr'].contains(locale.languageCode);

  @override
  Future<LocalizationService> load(Locale locale) {
    return SynchronousFuture<LocalizationService>(LocalizationService(locale));
  }

  @override
  bool shouldReload(LanguageDelegate old) => false;
}