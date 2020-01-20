import 'package:CSGamesApp/domain/school.dart';

class Team {
    String name;
    List<String> attendees;
    School school;

    Team({
        this.name,
        this.attendees,
        this.school
    });

    Team.fromMap(Map<String, dynamic> map) {
        name = map['name'];
        attendees = List.castFrom<dynamic, String>(map['attendees']);
        school = School.fromMap(map['school']);
    }
}