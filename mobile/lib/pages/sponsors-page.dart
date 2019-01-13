import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/title.dart';
import 'package:PolyHxApp/components/touchable-image.dart';
import 'package:PolyHxApp/domain/sponsors.dart';
import 'package:PolyHxApp/pages/sponsors-dialog.dart';
import 'package:PolyHxApp/redux/actions/sponsors-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class SponsorsPage extends StatelessWidget {
    void _openDialog(BuildContext context, Sponsors sponsors) {
        showDialog(context: context, builder: (_) => SponsorsDialog(sponsors), barrierDismissible: false);
    }

    Widget _buildSubtitle(String value) {
        return Padding(
            padding: EdgeInsets.all(5.0),
            child: Text(
                value,
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontFamily: 'OpenSans',
                    fontSize: 20.0
                )
            )
        );
    }

    Widget _buildImage(BuildContext context, Sponsors sponsors) {
        return TouchableImage(
            sponsors.widthFactor,
            sponsors.heightFactor,
            EdgeInsets.fromLTRB(
                sponsors.padding[0].toDouble(),
                sponsors.padding[1].toDouble(),
                sponsors.padding[2].toDouble(),
                sponsors.padding[3].toDouble()
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

    Widget _buildSponsors(BuildContext context, _SponsorsPageViewModel model) {
        return model.hasErrors
            ? Text(LocalizationService
            .of(context)
            .sponsors['error'])
            : Column(
            children: <Widget>[
                AppTitle(LocalizationService
                    .of(context)
                    .sponsors['title'], MainAxisAlignment.start),
                Expanded(
                    child: ListView(
                        padding: EdgeInsets.symmetric(vertical: 15.0),
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        children: model.sponsors.isEmpty ? [] : _groupSponsors(context, model.sponsors)
                    )
                )
            ]
        );
    }

    List<Widget> _groupSponsors(BuildContext context, Map<String, List<Sponsors>> sponsors) {
        List<Widget> widgets = [];
        if (sponsors.containsKey('Petabytes')) {
            widgets.add(_buildSubtitle('PETABYTES'));
            widgets.add(_buildLevel(context, sponsors['Petabytes'], 1));
        }

        if (sponsors.containsKey('Terabytes')) {
            widgets.add(_buildSubtitle('TERABYTES'));
            widgets.add(_buildLevel(context, sponsors['Terabytes'], 1));
        }

        if (sponsors.containsKey('Gigabytes')) {
            widgets.add(_buildSubtitle('GIGABYTES'));
            widgets.add(_buildLevel(context, sponsors['Gigabytes'], 2));
        }

        if (sponsors.containsKey('Megabytes')) {
            widgets.add(_buildSubtitle('MEGABYTES'));
            widgets.add(_buildLevel(context, sponsors['Megabytes'], 2));
        }

        return widgets;
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, _SponsorsPageViewModel>(
            onInit: (store) {
                final sponsorsState = store.state.sponsorsState;
                if (sponsorsState.sponsors.isEmpty && !sponsorsState.hasErrors) {
                    store.dispatch(LoadSponsorsAction(store.state.currentEvent.id));
                }
            },
            converter: (store) => _SponsorsPageViewModel.fromStore(store),
            builder: (BuildContext context, _SponsorsPageViewModel model) {
                return model.isLoading ? LoadingSpinner() : _buildSponsors(context, model);
            }
        );
    }
}

class _SponsorsPageViewModel {
    Map<String, List<Sponsors>> sponsors;
    bool isLoading;
    bool hasErrors;

    _SponsorsPageViewModel(this.sponsors,
        this.isLoading,
        this.hasErrors);

    _SponsorsPageViewModel.fromStore(Store<AppState> store) {
        sponsors = store.state.sponsorsState.sponsors;
        isLoading = store.state.sponsorsState.isLoading;
        hasErrors = store.state.sponsorsState.hasErrors;
    }
}