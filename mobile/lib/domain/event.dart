enum RegistrationStatus { NotRegistered, NotSelected, AwaitingConfirmation, Confirmed, Declined }

class EventRegistration {
  String attendeeId;
  bool selected;
  bool confirmed;
  bool declined;

  RegistrationStatus get Status {
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
    details = map['details'];
    attendees = map['attendees'].map((registration) => new EventRegistration.fromMap(registration)).toList();
  }

  bool isRegistered(String attendeeId) {
    return attendees.any((registration) => registration.attendeeId == attendeeId);
  }
  
  RegistrationStatus getRegistrationStatus(String attendeeId) {
    var registration = attendees.firstWhere((registration) => registration.attendeeId == attendeeId);
    if (registration == null) {
      return RegistrationStatus.NotRegistered;
    }
    return registration.Status;
  }
}
