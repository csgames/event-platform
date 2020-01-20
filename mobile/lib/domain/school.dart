class School {
    String name;
    String id;
    String countryCode;
    String website;

    School.fromMap(Map<String, dynamic> map) {
        name = map['name'];
        id = map['_id'];
        countryCode = map['countryCode'];
        website = map['website'];
    }
}