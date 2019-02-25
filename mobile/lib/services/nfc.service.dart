import 'dart:async';
import 'package:flutter/services.dart';

class NfcService {
  static const platform = const MethodChannel('app.csgames.org/nfc');

  StreamController<String> _controller = StreamController<String>.broadcast();

  Stream<String> get nfcStream => _controller.stream;
  
  NfcService() {
    platform.setMethodCallHandler((call) {
      if (call.method == "newNfcTagScanned") {
        _controller.add(call.arguments);
      }
    });
  }
}