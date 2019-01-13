class ActivityTypes {
    static const String Workshop = 'workshop';
    static const String Lunch = 'lunch';
}

class Activity {
    String id;
    String name;
    String type;
    DateTime beginDate;
    DateTime endDate;
    String location;
    List<String> attendees;
    Map<String, dynamic> description;

    Activity({
        this.id,
        this.name,
        this.type,
        this.beginDate,
        this.endDate,
        this.location,
        this.attendees,
        this.description
    });

    Activity.fromMap(Map<String, dynamic> map) {
        id = map['_id'];
        name = map['name'];
        type = map['type'];
        beginDate = DateTime.parse(map['beginDate']);
        endDate = DateTime.parse(map['endDate']);
        location = map['location'];
        attendees = List.castFrom<dynamic, String>(map['attendees']);
        description = Map.castFrom<String, dynamic, String, String>(map['details'] ?? {});
    }

    Activity.fromNotificationData(Map<String, dynamic> map) {
        id = map['_id'];
        name = map['name'];
        type = map['type'];
    }
}