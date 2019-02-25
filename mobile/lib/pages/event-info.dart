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
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:redux/redux.dart';

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

    List<Tile> availableTiles(BuildContext context, _GuideViewModel model) {
        List<Tile> list = [];
        if (model.guide.school != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.mapSigns,
                    LocalizationService
                        .of(context)
                        .eventInfo['school'],
                    'school'
                )
            );
        }

        if (model.guide.hotel != null) {
            list.add(
                Tile(
                    Icons.hotel,
                    LocalizationService
                        .of(context)
                        .eventInfo['hotel'],
                    'hotel'
                )
            );
        }

        list.add(
            Tile(
                FontAwesomeIcons.subway,
                LocalizationService
                    .of(context)
                    .eventInfo['transport'],
                    'transport'
            )
        );

        if (model.guide.parking != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.parking,
                    LocalizationService
                        .of(context)
                        .eventInfo['parking'],
                    'parking'
                )
            );
        }

        if (model.guide.bring.isNotEmpty) {
            list.add(
                Tile(
                    FontAwesomeIcons.clipboardCheck,
                    LocalizationService
                        .of(context)
                        .eventInfo['bring'],
                        'bring'
                )
            );
        }

        if (model.guide.restaurant != null) {
            list.add(
                Tile(
                    FontAwesomeIcons.utensils,
                    LocalizationService
                        .of(context)
                        .eventInfo['restaurant'],
                    'restaurant'
                )
            );
        }

        return list;
    }

    Widget _buildTiles(BuildContext context, _GuideViewModel model) {
        return Flexible(
            child: GridView.count(
                crossAxisCount: 2,
                padding: EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 10.0),
                mainAxisSpacing: 4.0,
                crossAxisSpacing: 4.0,
                children: model.guide != null
                    ? availableTiles(context, model).map((Tile tile) => InfoTile(tile, onTap: () => _showTileInfo(context, tile.id, model.guide))).toList()
                    : []
            )
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _GuideViewModel>(
            onInit: (store) {
                final guideState = store.state.guideState;
                if (guideState.guide == null && !guideState.hasErrors) {
                    store.dispatch(LoadGuideAction());
                }
            },
            converter: (store) => _GuideViewModel.fromStore(store),
            builder: (BuildContext context, _GuideViewModel model) {
                return model.isLoading
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
                            _buildTiles(context, model)
                        ]
                    );
            }
        );
    }
}

class _GuideViewModel {
    Guide guide;
    bool isLoading;
    bool hasErrors;

    _GuideViewModel(
        this.guide,
        this.isLoading,
        this.hasErrors
    );

    _GuideViewModel.fromStore(Store<AppState> store) {
        guide = store.state.guideState.guide;
        isLoading = store.state.guideState.isLoading;
        hasErrors = store.state.guideState.hasErrors;
    }
}
