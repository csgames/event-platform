import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/utils/constants.dart';

class ShirtSizeIcon extends StatelessWidget {
    static final Map<ShirtSize, String> _shirtSizeLetters = {
        ShirtSize.Small: 'S',
        ShirtSize.Medium: 'M',
        ShirtSize.Large: 'L',
        ShirtSize.XLarge: 'XL',
        ShirtSize.XXLarge: 'XXL',
    };

    final ShirtSize _shirtSize;
    final double factor;

    ShirtSizeIcon(this._shirtSize, {this.factor = 1.0});

    @override
    Widget build(BuildContext context) {
        return Stack(
            alignment: Alignment.center,
            children: <Widget>[
                Image.asset('assets/tshirt.png',
                    width: 120.0 * factor,
                ),
                Text(_shirtSize != null ? _shirtSizeLetters[_shirtSize] : "N/A",
                    style: TextStyle(
                        color: Constants.polyhxGrey,
                        fontFamily: "Montserrat",
                        fontSize: 28.0 * factor,
                        fontWeight: FontWeight.w500,
                    ),
                ),
            ],
        );
    }
}

