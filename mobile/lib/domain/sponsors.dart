class Sponsors {
  Map<String, dynamic> description;
  String website;
  String imageUrl;
  List<dynamic> padding;
  double widthFactor;
  double heightFactor;

  Sponsors({
    this.description,
    this.website,
    this.imageUrl,
    this.padding,
    this.widthFactor,
    this.heightFactor
  });

  Sponsors.fromMap(Map<String, dynamic> map) {
    description = map['description'];
    website = map['website'];
    imageUrl = map['imageUrl'];
    padding = map['padding'];
    widthFactor = map['widthFactor'];
    heightFactor = map['heightFactor'];
  }
}