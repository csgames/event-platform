import 'package:CSGamesApp/redux/actions/puzzle-actions.dart';
import 'package:CSGamesApp/redux/actions/puzzle-hero-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:CSGamesApp/services/puzzle-hero.service.dart';
import 'package:flutter/material.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class PuzzleMiddleware extends EpicClass<AppState> {
    final PuzzleHeroService _puzzleHeroService;
    final QRCodeReader _qrCodeReader;

    PuzzleMiddleware(this._puzzleHeroService, this._qrCodeReader);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<ScanAction>())
                .switchMap((action) => _scan(action.puzzleId, action.context)),
            Observable(actions)
                .ofType(TypeToken<ValidateAction>())
                .switchMap((action) => _validate(action.answer, action.puzzleId, action.context))
        ]);
    }

    Stream<dynamic> _scan(String puzzleId, BuildContext context) async* {
        try {
            String answer = await _qrCodeReader.scan();
            if (answer != null) {
                yield ScanSuccess(answer, puzzleId);
            }
        } catch (err) {
            yield ScanErrorAction(puzzleId);
            Scaffold.of(context).showSnackBar(
                SnackBar(
                    content: Text(
                        LocalizationService.of(context).puzzle['scan-error'],
                        style: TextStyle(color: Colors.white)
                    ),
                    action: SnackBarAction(
                        label: 'OK',
                        onPressed: Scaffold.of(context).hideCurrentSnackBar
                    )
                )
            );
        }
    }

    Stream<dynamic> _validate(String answer, String puzzleId, BuildContext context) async* {
        try {
            bool result = await this._puzzleHeroService.validate(puzzleId, answer);
            if (result) {
                yield LoadPuzzleHeroAction();
            } else {
                yield IncorrectPuzzleAction(puzzleId);
                Scaffold.of(context).showSnackBar(
                    SnackBar(
                        content: Text(
                            LocalizationService.of(context).puzzle['validation-error'],
                            style: TextStyle(color: Colors.white)
                        ),
                        action: SnackBarAction(
                            label: 'OK',
                            onPressed: Scaffold.of(context).hideCurrentSnackBar
                        )
                    )
                );
            }
        } catch (err) {
            yield IncorrectPuzzleAction(puzzleId);
            Scaffold.of(context).showSnackBar(
                SnackBar(
                    content: Text(
                        LocalizationService.of(context).puzzle['validation-error'],
                        style: TextStyle(color: Colors.white)
                    ),
                    action: SnackBarAction(
                        label: 'OK',
                        onPressed: Scaffold.of(context).hideCurrentSnackBar
                    )
                )
            );
        }
    }
}