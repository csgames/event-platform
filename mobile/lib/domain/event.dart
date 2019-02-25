enum RegistrationStatus { NotRegistered, NotSelected, AwaitingConfirmation, Confirmed, Declined, Present }

class EventRegistration {
  String attendeeId;
  bool register;

  EventRegistration({
    this.attendeeId,
    this.register
  });

  EventRegistration.fromMap(Map<String, dynamic> map) {
    attendeeId = map['attendee'];
    register = map['register'];
  }
}

class Event {
  String id;
  String name;
  DateTime beginDate;
  DateTime endDate;
  String imageUrl;
  String coverUrl;
  String website;
  List<EventRegistration> attendees;

  Event({
    this.id,
    this.name,
    this.beginDate,
    this.endDate,
    this.imageUrl,
    this.coverUrl,
    this.website,
    this.attendees,
  });

  Event.fromMap(Map<dynamic, dynamic> map) {
    id = map['_id'];
    name = map['name'];
    beginDate = DateTime.parse(map['beginDate']);
    endDate = DateTime.parse(map['endDate']);
    imageUrl = map['imageUrl'];
    coverUrl = map['coverUrl'];
    attendees = List.castFrom<dynamic, EventRegistration>(map['attendees'].map((registration) => EventRegistration.fromMap(registration)).toList());
  }

  bool isRegistered(String attendeeId) {
    return attendees.any((registration) => registration.attendeeId == attendeeId);
  }
}
