import 'package:CSGamesApp/pages/event-info.dart';
import 'package:CSGamesApp/utils/constants.dart';
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
                child: Stack(
                    children: <Widget>[
                        Container(
                            constraints: BoxConstraints(
                                maxHeight: 400.0,
                                maxWidth: 400.0,
                                minWidth: 300.0,
                                minHeight: 300.0
                            ),
                            child: Hero(
                                tag: "guide-card-" + _tile.id,
                                child: Container(
                                    decoration: BoxDecoration(
                                        color: _pressed ? Colors.white.withOpacity(0.85) : Colors.white,
                                        boxShadow: <BoxShadow>[
                                            BoxShadow(
                                                color: Colors.black.withOpacity(_pressed ? 0.15 : 0.1),
                                                offset: Offset(1.1, 1.1),
                                                blurRadius: 5.0,
                                            ),
                                        ]
                                    ),
                                    child: Column(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: <Widget>[
                                            Container(
                                                decoration: BoxDecoration(
                                                    color: Constants.csLightBlue.withOpacity(0.05),
                                                    shape: BoxShape.circle
                                                ),
                                                child: Padding(
                                                    padding: EdgeInsets.all(25.0),
                                                    child: Icon(
                                                        _tile.icon,
                                                        size: 50.0,
                                                        color: Constants.csLightBlue
                                                    )
                                                ),
                                            ),
                                            Padding(
                                                padding: EdgeInsets.only(top: MediaQuery
                                                    .of(context)
                                                    .size
                                                    .height * 0.01),
                                                child: Text(
                                                    _tile.title,
                                                    style: TextStyle(
                                                        fontSize: 15.0,
                                                        fontWeight: FontWeight.w500,
                                                        fontFamily: 'Montserrat'
                                                    )
                                                )
                                            ),
                                        ]
                                    )
                                )
                            )
                        ),
                        Positioned(
                            top: 0.0,
                            child: Center(
                                child: Container(
                                    width: 60,
                                    height: 6,
                                    child: Material(
                                        color: Constants.csBlue,
                                        child: Text('')
                                    )
                                )
                            )
                        )
                    ]
                )
            )
        );
    }
}
