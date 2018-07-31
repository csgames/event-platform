enum RegistrationStatus { NotRegistered, NotSelected, AwaitingConfirmation, Confirmed, Declined, Present }

class EventRegistration {
  String attendeeId;
  bool selected;
  bool confirmed;
  bool declined;
  bool present;

  RegistrationStatus get status {
    if (present != null && present) {
      return RegistrationStatus.Present;
    }
    if (confirmed != null && confirmed) {
      return RegistrationStatus.Confirmed;
    }
    if (declined != null && declined) {
      return RegistrationStatus.Declined;
    }
    if (selected == null || !selected) {
      return RegistrationStatus.NotSelected;
    }
    return RegistrationStatus.AwaitingConfirmation;
  }

  EventRegistration({
    this.attendeeId,
    this.selected,
    this.confirmed,
    this.declined,
  });

  EventRegistration.fromMap(Map<String, dynamic> map) {
    attendeeId = map['attendee'];
    selected = map['selected"'];
    confirmed = map['confirmed'];
    declined = map['declined'];
    present = map['present'];
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
  Map<String, String> details;
  List<EventRegistration> attendees;

  Event({
    this.id,
    this.name,
    this.beginDate,
    this.endDate,
    this.imageUrl,
    this.coverUrl,
    this.website,
    this.details,
    this.attendees,
  });

  Event.fromMap(Map<String, dynamic> map) {
    id = map['_id'];
    name = map['name'];
    beginDate = DateTime.parse(map['beginDate']);
    endDate = DateTime.parse(map['endDate']);
    imageUrl = map['imageUrl'];
    coverUrl = map['coverUrl'];
    website = map['website'];
    details = Map.castFrom<String, dynamic, String, String>(map['details']);
    attendees = List.castFrom<dynamic, EventRegistration>(map['attendees'].map((registration) => EventRegistration.fromMap(registration)).toList());
  }

  bool isRegistered(String attendeeId) {
    return attendees.any((registration) => registration.attendeeId == attendeeId);
  }
  
  RegistrationStatus getRegistrationStatus(String attendeeId) {
    var registration = attendees.firstWhere((registration) => registration.attendeeId == attendeeId);
    if (registration == null) {
      return RegistrationStatus.NotRegistered;
    }
    return registration.status;
  }
}
