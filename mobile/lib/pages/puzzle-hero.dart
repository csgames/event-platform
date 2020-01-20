import 'package:CSGamesApp/components/loading-spinner.dart';
import 'package:CSGamesApp/components/puzzle-hero-card.dart';
import 'package:CSGamesApp/components/time-card.dart';
import 'package:CSGamesApp/components/title.dart';
import 'package:CSGamesApp/domain/puzzle-hero.dart';
import 'package:CSGamesApp/redux/actions/puzzle-hero-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/redux/states/puzzle-hero-state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class PuzzleHeroPage extends StatelessWidget {
    Widget _buildBody(BuildContext context, PuzzleHeroState state) {
        Widget body;
        DateTime now = DateTime.now();
        if (!state.isOpen) {
            body = Text(LocalizationService.of(context).puzzle['date']);
        } else if (state.puzzleHero != null && state.puzzleHero.releaseDate.isBefore(now) && state.puzzleHero.endDate.isAfter(now)) {
            body = _buildCards(context, state.puzzleHero);
        } else {
            body = Text(LocalizationService.of(context).puzzle['error']);
        }
        return body;
    }

    Widget _buildCards(BuildContext context, PuzzleHero puzzleHero) {
        return Column(
            children: <Widget>[
                AppTitle(LocalizationService
                    .of(context)
                    .puzzle['title'], MainAxisAlignment.start),
                Flexible(
                    child: SingleChildScrollView(
                        child: Column(
                            children: puzzleHero.tracks.map((t) =>
                                Container(
                                    child: Column(
                                        children: <Widget>[
                                            TimeCard(t.label),
                                            Column(
                                                children: t.puzzles.map((p) =>
                                                    PuzzleHeroCard(p)
                                                ).toList()
                                            )
                                        ]
                                    )
                                )
                            ).toList()
                        )
                    )
                )
            ]
        );
    }

    @override
    Widget build(BuildContext context) {
        return StoreConnector<AppState, PuzzleHeroState>(
            onInit: (store) {
                if (store.state.puzzleHeroState != null && store.state.puzzleHeroState.isOpen) {
                    store.dispatch(LoadPuzzleHeroAction());
                }
            },
            converter: (store) => store.state.puzzleHeroState,
            builder: (BuildContext context, PuzzleHeroState state) {
                return state.isLoading ? LoadingSpinner() : Center(
                    child: SizedBox.fromSize(
                        child: _buildBody(context, state)
                    )
                );
            }
        );
    }
}
