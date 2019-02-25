import 'dart:convert';

import 'package:CSGamesApp/domain/puzzle-hero.dart';
import 'package:CSGamesApp/services/csgames.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class PuzzleHeroService extends CSGamesApi {
    HttpClient _httpClient;

    PuzzleHeroService(this._httpClient) : super('puzzle-hero');

    Future<PuzzleHero> getPuzzleHero() async {
        String url = this.url().substring(0, this.url().length - 1);
        final response = await this._httpClient.get('$url?type=scavenger');
        final responseMap = json.decode(response.body);
        return PuzzleHero.fromMap(responseMap);
    }

    Future<bool> validate(String puzzleId, String answer) async {
        final body = {"answer": answer};
        final response = await _httpClient.post(url('puzzle/$puzzleId/validate'), body: body);
        return response.statusCode == 200;
    }
}