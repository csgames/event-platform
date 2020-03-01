import 'package:CSGamesApp/components/hero-dialog-route.dart';
import 'package:CSGamesApp/components/info-tile.dart';
import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/guide.dart';
import 'package:CSGamesApp/pages/bring.dart';
import 'package:CSGamesApp/pages/hotel.dart';
import 'package:CSGamesApp/pages/parking.dart';
import 'package:CSGamesApp/pages/restaurant.dart';
import 'package:CSGamesApp/pages/school.dart';
import 'package:CSGamesApp/pages/transport.dart';
import 'package:CSGamesApp/redux/actions/guide-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/states/guide-state.dart';
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

    void _showTileInfo(BuildContext context, String id, Guide guide) {
        var widget;
        switch (id) {
            case 'bring':
                widget = BringPage(guide.bring);
                break;
            case 'parking':
                widget = ParkingState(guide.parking);
                break;
            case 'hotel':
                widget = HotelState(guide.hotel);
                break;
            case 'restaurant':
                widget = RestaurantState(guide.restaurant);
                break;
            case 'transport':
                widget = TransportPage(guide.transport);
                break;
            case 'school':
                widget = SchoolPage(guide.school);
                break;
        }
        Navigator.push(
            context,
            HeroDialogRoute(
                builder: (_) => widget
            )
        );
    }

    List<Tile> availableTiles(BuildContext context, GuideState state) {
        List<Tile> list = [];
        if (state.guide.school != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.lightMapSigns,
                    LocalizationService
                        .of(context)
                        .eventInfo['school'],
                    'school'
                )
            );
        }

        if (state.guide.hotel != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.lightBed,
                    LocalizationService
                        .of(context)
                        .eventInfo['hotel'],
                    'hotel'
                )
            );
        }

        list.add(
            Tile(
                FontAwesomeIcons.lightSubway,
                LocalizationService
                    .of(context)
                    .eventInfo['transport'],
                    'transport'
            )
        );

        if (state.guide.parking != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.lightParking,
                    LocalizationService
                        .of(context)
                        .eventInfo['parking'],
                    'parking'
                )
            );
        }

        if (state.guide.bring?.isNotEmpty ?? false) {
            list.add(
                Tile(
                    FontAwesomeIcons.lightClipboardCheck,
                    LocalizationService
                        .of(context)
                        .eventInfo['bring'],
                        'bring'
                )
            );
        }

        if (state.guide.restaurant != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.lightUtensils,
                    LocalizationService
                        .of(context)
                        .eventInfo['restaurant'],
                    'restaurant'
                )
            );
        }

        return list;
    }

    Widget _buildTiles(BuildContext context, GuideState model) {
        return Flexible(
            child: GridView.count(
                crossAxisCount: 2,
                padding: EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 10.0),
                mainAxisSpacing: 4.0,
                crossAxisSpacing: 0.0,
                children: model.guide != null
                    ? availableTiles(context, model).map((Tile tile) => InfoTile(tile, onTap: () => _showTileInfo(context, tile.id, model.guide))).toList()
                    : []
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, GuideState>(
            onInit: (store) => store.dispatch(LoadGuideAction()),
            converter: (store) => store.state.guideState,
            builder: (BuildContext context, GuideState state) {
                return state.isLoading
                    ? LoadingSpinner()
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                            AppTitle(
                                LocalizationService
                                    .of(context)
                                    .eventInfo['title'],
                                MainAxisAlignment.spaceBetween
                            ),
                            _buildTiles(context, state)
                        ]
                    );
            }
        );
    }
}
