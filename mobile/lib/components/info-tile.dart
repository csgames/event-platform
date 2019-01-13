import 'package:PolyHxApp/pages/event-info.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';

class InfoTile extends StatefulWidget {
    Tile _tile;
    Function onTap;

    InfoTile(this._tile, {this.onTap});

    @override
    State<StatefulWidget> createState() => _InfoTileState(_tile, onTap);

}

class _InfoTileState extends State<InfoTile> {
    Tile _tile;
    bool _pressed = false;
    Function _onTap;


    _InfoTileState(this._tile, this._onTap);

    void setPressed(bool pressed) {
        setState(() => _pressed = pressed);
    }

    @override
    Widget build(BuildContext context) {
        return GestureDetector(
            onTap: () => _onTap(),
            onTapDown: (d) => setPressed(true),
            onTapCancel: () => setPressed(false),
            onTapUp: (d) => setPressed(false),
            child: Padding(
                padding: EdgeInsets.all(12.5),
                child: Container(
                    child: Hero(tag: "guide-card-" + _tile.id, child: Material(
                        color: _pressed ? Colors.white70 : Colors.white,
                        borderRadius: BorderRadius.circular(15.0),
                        elevation: _pressed ? 5.0 : 2.0,
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                                Padding(
                                    padding: EdgeInsets.only(top: 7.0),
                                    child: Icon(
                                        _tile.icon,
                                        size: 80.0,
                                        color: Constants.polyhxRed
                                    )
                                ),
                                Padding(
                                    padding: EdgeInsets.only(top: MediaQuery
                                        .of(context)
                                        .size
                                        .height * 0.01),
                                    child: Text(
                                        _tile.title,
                                        style: TextStyle(
                                            fontSize: 18.0,
                                            fontFamily: 'OpenSans'
                                        )
                                    )
                                )

                            ]
                        )
                    )
                    )
                )
            )
        );
    }

}
