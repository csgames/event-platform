import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/components/touchable-image.dart';
import 'package:CSGamesApp/domain/sponsors.dart';
import 'package:CSGamesApp/pages/sponsors-dialog.dart';
import 'package:CSGamesApp/redux/actions/sponsors-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/states/sponsors-state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class SponsorsPage extends StatelessWidget {
    void _openDialog(BuildContext context, Sponsors sponsors) {
        showDialog(context: context, builder: (_) => SponsorsDialog(sponsors), barrierDismissible: false);
    }

    Widget _buildSubtitle(String value) {
        return Padding(
            padding: EdgeInsets.all(5.0),
            child: Text(
                value,
                textAlign: TextAlign.left,
                style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 20.0,
                    fontWeight: FontWeight.w400
                )
            )
        );
    }

    Widget _buildImage(BuildContext context, Sponsors sponsors) {
        return TouchableImage(
            sponsors.details.widthFactor.toDouble(),
            sponsors.details.heightFactor.toDouble(),
            EdgeInsets.fromLTRB(
                sponsors.details.padding[0].toDouble(),
                sponsors.details.padding[1].toDouble(),
                sponsors.details.padding[2].toDouble(),
                sponsors.details.padding[3].toDouble()
            ),
            sponsors.imageUrl,
                () => _openDialog(context, sponsors)
        );
    }

    Widget _buildLevel(BuildContext context, List<Sponsors> sponsors, int count) {
        int i = 0;
        List<Row> rows = List<Row>();
        while (i < sponsors.length) {
            List<Widget> widgets = List<Widget>();
            for (int j = 0; j < count; j++) {
                if (i + j < sponsors.length) {
                    widgets.add(_buildImage(context, sponsors[i + j]));
                }
            }
            Row row = Row(
                mainAxisAlignment: count > 1 && widgets.length > 1 ? MainAxisAlignment.spaceEvenly : MainAxisAlignment.center,
                children: widgets
            );
            rows.add(row);
            i += count;
        }
        return Column(children: rows);
    }

    Widget _buildSponsors(BuildContext context, SponsorsState state) {
        return state.hasErrors
            ? Text(LocalizationService
            .of(context)
            .sponsors['error'])
            : Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
                AppTitle(LocalizationService
                    .of(context)
                    .sponsors['title'], MainAxisAlignment.start),
                Expanded(
                    child: ListView(
                        padding: EdgeInsets.all(15.0),
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        children: state.sponsors.isEmpty ? [] : _groupSponsors(context, state.sponsors)
                    )
                )
            ]
        );
    }

    List<Widget> _groupSponsors(BuildContext context, Map<String, List<Sponsors>> sponsors) {
        List<Widget> widgets = [];
        if (sponsors.containsKey('Platinum')) {
            widgets.add(_buildSubtitle('PLATINUM'));
            widgets.add(_buildLevel(context, sponsors['Platinum'], 1));
        }

        if (sponsors.containsKey('Gold')) {
            widgets.add(_buildSubtitle('GOLD'));
            widgets.add(_buildLevel(context, sponsors['Gold'], 2));
        }

        if (sponsors.containsKey('Silver')) {
            widgets.add(_buildSubtitle('SILVER'));
            widgets.add(_buildLevel(context, sponsors['Silver'], 3));
        }

        if (sponsors.containsKey('Bronze')) {
            widgets.add(_buildSubtitle('BRONZE'));
            widgets.add(_buildLevel(context, sponsors['Bronze'], 3));
        }

        return widgets;
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, SponsorsState>(
            onInit: (store) => store.dispatch(LoadSponsorsAction()),
            converter: (store) => store.state.sponsorsState,
            builder: (BuildContext context, SponsorsState state) {
                return state.isLoading ? LoadingSpinner() : _buildSponsors(context, state);
            }
        );
    }
}
