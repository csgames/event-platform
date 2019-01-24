import 'dart:convert';

import 'package:CSGamesApp/domain/sponsors.dart';
import 'package:CSGamesApp/services/event-management.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';

class SponsorsService extends EventManagementService {
    HttpClient _httpClient;

    SponsorsService(this._httpClient) : super('sponsor');

    Future<Map<String, List<Sponsors>>> getAllSponsors(String eventId) async {
        final response = await this._httpClient.get(this.getEvent(path: '$eventId/sponsor'));
        final responseMap = json.decode(response.body);
        Map<String, List<Sponsors>> result = {};
        if (responseMap.containsKey('Platinum')) {
            result['Platinum'] = [];
            for (var s in responseMap['Platinum']) {
                result['Platinum'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Gold')) {
            result['Gold'] = [];
            for (var s in responseMap['Gold']) {
                result['Gold'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Silver')) {
            result['Silver'] = [];
            for (var s in responseMap['Silver']) {
                result['Silver'].add(Sponsors.fromMap(s));
            }
        }

        if (responseMap.containsKey('Bronze')) {
            result['Bronze'] = [];
            for (var s in responseMap['Bronze']) {
                result['Bronze'].add(Sponsors.fromMap(s));
            }
        }

        return result;
    }
}