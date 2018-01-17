import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'package:flutter/widgets.dart';

class Gravatar extends NetworkImage {
  Gravatar(String email, {int size = 200})
    :super('https://www.gravatar.com/avatar/${md5.convert(UTF8.encode(email))}?s=${size}&d=mm');
}