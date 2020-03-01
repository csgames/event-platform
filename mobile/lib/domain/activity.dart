class ActivityTypes {
    static const String Competition = 'competition';
    static const String Food = 'food';
    static const String Transport = 'transport';
}

class Activity {
    String id;
    Map<String, dynamic> name;
    String type;
    DateTime beginDate;
    DateTime endDate;
    String location;
    List<String> attendees;
    Map<String, dynamic> description;
    bool subscribed;
    bool hidden;

    Activity({
        this.id,
        this.name,
        this.type,
        this.beginDate,
        this.endDate,
        this.location,
        this.attendees,
        this.description,
        this.hidden
    });

    Activity.fromMap(Map<String, dynamic> map) {
        id = map['_id'];
        name = Map.castFrom<String, dynamic, String, String>(map['name'] ?? {});
        type = map['type'];
        beginDate = DateTime.parse(map['beginDate'])?.toLocal();
        endDate = DateTime.parse(map['endDate'])?.toLocal();
        location = map['location'];
        attendees = List.castFrom<dynamic, String>(map['attendees']);
        description = Map.castFrom<String, dynamic, String, String>(map['details'] ?? {});
        subscribed = map['subscribed'];
        hidden = map['hidden'] ?? false;
    }

    Activity.fromNotificationData(Map<String, dynamic> map) {
        id = map['_id'];
        name = Map.castFrom<String, dynamic, String, String>(map['name'] ?? {});
        type = map['type'];
    }
}

