import 'dart:convert';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/services/csgames.api.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class TeamService extends CSGamesApi {
    HttpClient _httpClient;

    TeamService(this._httpClient) : super('team');

    Future<Team> getTeamInfo() async {
        try {
            final response = await _httpClient.get(url('info'));
            final responseMap = json.decode(response.body);
            return Team.fromMap(responseMap);
        } catch (err) {
            print('TeamService.getTeamInfo(): $err');
            return null;
        }
    }

    Future<Team> getAttendeeTeam(Attendee attendee) async {
        try {
            final response = await _httpClient.get(url('info/${attendee.email}'));
            final responseMap = json.decode(response.body);
            return Team.fromMap(responseMap);
        } catch (err) {
            print('TeamService.getAttendeeTeam(): $err');
            return null;
        }
    }
}