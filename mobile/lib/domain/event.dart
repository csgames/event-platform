class Event {
  String name;
  DateTime beginDate;
  DateTime endDate;
  String imageUrl;
  String coverUrl;
  String website;
  Map<String, String> details;

  Event({
    this.name,
    this.beginDate,
    this.endDate,
    this.imageUrl,
    this.coverUrl,
    this.website,
    this.details
  });

  Event.fromMap(Map<String, dynamic> map) {
    name = map['name'];
    beginDate = map['beginDate'];
    endDate = map['endDate'];
    imageUrl = map['imageUrl'];
    coverUrl = map['coverUrl'];
    website = map['website'];
    details = map['details'];
  }
}
