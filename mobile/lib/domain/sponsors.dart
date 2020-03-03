class Sponsors {
  Map<String, dynamic> description;
  String website;
  String imageUrl;
  SponsorDetails details;

  Sponsors({
    this.description,
    this.website,
    this.imageUrl,
    this.details
  });

  Sponsors.fromMap(Map<String, dynamic> map) {
    description = map['description'];
    website = map['website'];
    imageUrl = map['imageUrl'];
    details = SponsorDetails.fromMap(map['mobile']);
  }
}

class SponsorDetails {
    List<dynamic> padding;
    double widthFactor;
    double heightFactor;

    SponsorDetails.fromMap(Map<String, dynamic> map) {
        padding = map['padding'];
        widthFactor = map['widthFactor']?.toDouble();
        heightFactor = map['heightFactor']?.toDouble();
    }
}