import 'package:flutter/material.dart';

class PillTextField extends StatelessWidget {
  final Key key;
  final TextEditingController controller;
  final FocusNode focusNode;
  final InputDecoration decoration;
  final TextInputType keyboardType;
  final TextStyle style;
  final TextAlign textAlign;
  final bool autofocus;
  final bool obscureText;
  final bool autocorrect;
  final int maxLines;
  final int maxLength;
  final bool maxLengthEnforced;
  final ValueChanged<String> onChanged;
  final ValueChanged<String> onSubmitted;
  final List inputFormatters;

  final Color color;
  final double elevation;

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
    return Material(
      borderRadius: BorderRadius.circular(30.0),
      elevation: elevation,
      child: TextField(
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
