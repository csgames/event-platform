import 'dart:convert';

import 'package:crypto/crypto.dart';

String gravatarFromEmailWithFallback(String email) {
  return 'http://www.gravatar.com/avatar/${md5.convert(utf8.encode(email ?? '')).toString()}?s=256&r=g&d=mm';
}
