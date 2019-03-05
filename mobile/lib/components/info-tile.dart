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
                        Positioned(
                            top: 15.0,
                            child: Center(
                                child: Container(
                                    width: 20,
                                    height: 60,
                                    decoration: BoxDecoration(
                                        boxShadow: [
                                            BoxShadow(
                                                color: Colors.black12,
                                                blurRadius: 4.0,
                                                offset: Offset(0, 1),
                                                spreadRadius: 0.0
                                            )
                                        ]
                                    ),
                                    child: Material(
                                        borderRadius: BorderRadius.circular(10.0),
                                        color: Constants.csBlue,
                                        child: Text('')
                                    )
                                )
                            )
                        ),
                        Container(
                            margin: EdgeInsets.only(left: 10.0),
                            constraints: BoxConstraints(
                                maxHeight: 400.0,
                                maxWidth: 400.0,
                                minWidth: 300.0,
                                minHeight: 300.0
                            ),
                            child: Hero(
                                tag: "guide-card-" + _tile.id,
                                child: Material(
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
                                                    color: Constants.csBlue
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
                                                        fontSize: 15.0,
                                                        fontFamily: 'OpenSans'
                                                    )
                                                )
                                            ),
                                        ]
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
