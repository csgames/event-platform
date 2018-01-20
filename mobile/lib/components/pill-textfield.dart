import 'package:flutter/material.dart';

class PillTextField extends StatelessWidget {
  Key key;
  TextEditingController controller;
  FocusNode focusNode;
  InputDecoration decoration;
  TextInputType keyboardType;
  TextStyle style;
  TextAlign textAlign;
  bool autofocus;
  bool obscureText;
  bool autocorrect;
  int maxLines;
  int maxLength;
  bool maxLengthEnforced;
  ValueChanged<String> onChanged;
  ValueChanged<String> onSubmitted;
  List inputFormatters;

  Color color;
  double elevation;

  PillTextField({
    this.key,
    this.controller,
    this.focusNode,
    this.decoration: const InputDecoration(),
    this.keyboardType: TextInputType.text,
    this.style,
    this.textAlign: TextAlign.start,
    this.autofocus: false,
    this.obscureText: false,
    this.autocorrect: true,
    this.maxLines: 1,
    this.maxLength,
    this.maxLengthEnforced: true,
    this.onChanged,
    this.onSubmitted,
    this.inputFormatters,
    this.color,
    this.elevation = 2.0,
  });

  @override
  Widget build(BuildContext context) {
    return new Material(
      borderRadius: new BorderRadius.circular(30.0),
      elevation: elevation,
      child: new TextField(
        key: key,
        controller: controller,
        focusNode: focusNode,
        decoration: decoration,
        keyboardType: keyboardType,
        style: style,
        textAlign: textAlign,
        autofocus: autofocus,
        obscureText: obscureText,
        autocorrect: autocorrect,
        maxLines: maxLines,
        maxLength: maxLength,
        maxLengthEnforced: maxLengthEnforced,
        onChanged: onChanged,
        onSubmitted: onSubmitted,
        inputFormatters: inputFormatters,
      ),
    );
  }

}
