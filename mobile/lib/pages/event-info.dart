import 'package:CSGamesApp/components/hero-dialog-route.dart';
import 'package:CSGamesApp/components/info-tile.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/pages/bring.dart';
import 'package:CSGamesApp/pages/parking.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Tile {
    IconData icon;
    String title;
    String id;

    Tile(this.icon, this.title, this.id);
}

class EventInfoPage extends StatelessWidget {

    void _showTileInfo(BuildContext context, String id) {
        var widget;
        switch (id) {
            case '1':
                widget = BringPage(LocalizationService
                    .of(context)
                    .bring);
                break;
            case '2':
                widget = ParkingState();
                break;
        }
        Navigator.push(
            context,
            HeroDialogRoute(
                builder: (_) => widget
            )
        );
    }

    Widget _buildTiles(BuildContext context) {
        return Flexible(
            child: GridView.count(
                crossAxisCount: 2,
                padding: EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 10.0),
                mainAxisSpacing: 4.0,
                crossAxisSpacing: 4.0,
                children: [
                    Tile(
                        FontAwesomeIcons.clipboardCheck,
                        LocalizationService
                            .of(context)
                            .eventInfo['bring'],
                        '1'
                    ),
                    Tile(
                        FontAwesomeIcons.parking,
                        LocalizationService
                            .of(context)
                            .eventInfo['parking'],
                        '2'
                    )
                ].map((Tile tile) => InfoTile(tile, onTap: () => _showTileInfo(context, tile.id))).toList()
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, Event>(
            converter: (store) => store.state.currentEvent,
            builder: (BuildContext context, Event event) {
                return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                        AppTitle(
                            LocalizationService
                                .of(context)
                                .eventInfo['title'],
                            MainAxisAlignment.spaceBetween
                        ),
                        _buildTiles(context)
                    ]
                );
            }
        );
    }
}
