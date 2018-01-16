class Event {
  String id;
  String name;
  DateTime beginDate;
  DateTime endDate;
  String imageUrl;
  String coverUrl;
  String website;
  Map<String, String> details;

  Event({
    this.id,
    this.name,
    this.beginDate,
    this.endDate,
    this.imageUrl,
    this.coverUrl,
    this.website,
    this.details
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
  }
}
