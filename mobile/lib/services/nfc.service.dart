import 'dart:async';

import 'package:flutter/src/services/platform_channel.dart';

class NfcService {
  static const platform = const MethodChannel('app.polyhx.io/nfc');

  StreamController<String> _controller = new StreamController<String>.broadcast();

  Stream<String> get NfcStream => _controller.stream;
  
  NfcService() {
    platform.setMethodCallHandler((call) {
      if (call.method == "newNfcTagScanned") {
        _controller.add(call.arguments);
      }
    });
  }
}