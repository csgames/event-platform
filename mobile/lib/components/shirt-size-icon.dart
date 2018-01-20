import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/utils/constants.dart';

class ShirtSizeIcon extends StatelessWidget {
  static final Map<ShirtSize, String> _SHIRT_SIZE_LETTERS = {
    ShirtSize.Small: 'S',
    ShirtSize.Medium: 'M',
    ShirtSize.Large: 'L',
    ShirtSize.XLarge: 'XL',
    ShirtSize.XXLarge: 'XXL',
  };

  ShirtSize _shirtSize;
  double factor;

  ShirtSizeIcon(this._shirtSize, {this.factor = 1.0});

  @override
  Widget build(BuildContext context) {
    return new Stack(
      alignment: Alignment.center,
      children: <Widget>[
        new Image.asset('assets/tshirt.png',
          width: 120.0 * factor,
        ),
        new Text(_SHIRT_SIZE_LETTERS[_shirtSize],
          style: new TextStyle(
            color: Constants.POLYHX_GREY,
            fontSize: 28.0 * factor,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}

