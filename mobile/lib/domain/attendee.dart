enum Gender { Male, Female, Other, NoAnswer }

enum ShirtSize { Small, Medium, Large, XLarge, XXLarge, Invalid }

class Attendee {
  static final Map<String, Gender> _genders = {
    'male': Gender.Male,
    'female': Gender.Female,
    'other': Gender.Other,
    'no_answer': Gender.NoAnswer,
  };

  static final Map<String, ShirtSize> _shirtSizes = {
    'small': ShirtSize.Small,
    'medium': ShirtSize.Medium,
    'large': ShirtSize.Large,
    'x-large': ShirtSize.XLarge,
    '2x-large': ShirtSize.XXLarge,
  };

  String id;
  String firstName;
  String lastName;
  String email;
  String role;
  String github;
  String linkedIn;
  String cv;
  String website;
  Gender gender;
  ShirtSize shirtSize;
  String phoneNumber;
  bool acceptSmsNotification;
  bool hasDietaryRestrictions;
  String dietaryRestrictions;
  String publicId;
  bool needsTransportPass;

  Attendee({
    this.id,
    this.firstName,
    this.lastName,
    this.role,
    this.email,
    this.github,
    this.linkedIn,
    this.cv,
    this.website,
    this.gender,
    this.shirtSize,
    this.phoneNumber,
    this.acceptSmsNotification,
    this.hasDietaryRestrictions,
    this.dietaryRestrictions,
    this.publicId,
    this.needsTransportPass
  });

  Attendee.fromMap(Map<String, dynamic> map) {
    id = map["_id"];
    firstName = map["firstName"];
    lastName = map["lastName"];
    email = map["email"];
    role = map["role"];
    github = map['github'];
    linkedIn = map['linkedIn'];
    cv = map['cv'];
    website = map['website'];
    gender = _genders[map['gender']];
    shirtSize = _shirtSizes[map['tshirt']];
    phoneNumber = map['phoneNumber'];
    acceptSmsNotification = map['acceptSMSNotification'];
    hasDietaryRestrictions = map['hasDietaryRestrictions'];
    dietaryRestrictions = map['dietaryRestrictions'];
    publicId = map['publicId'];
    needsTransportPass = map['needsTransportPass'];
  }

  Attendee.fromInfoMap(Map<String, dynamic> map) {
        id = map["_id"];
        firstName = map["firstName"];
        lastName = map["lastName"];
        email = map["email"];
        role = map["role"];
        github = map['github'];
        linkedIn = map['linkedIn'];
        website = map['website'];
        gender = _genders[map['gender']];
        shirtSize = _shirtSizes[map['tshirt']];
        phoneNumber = map['phoneNumber'];
        acceptSmsNotification = map['acceptSMSNotification'];
        hasDietaryRestrictions = map['hasDietaryRestrictions'];
        dietaryRestrictions = map['dietaryRestrictions'];
        publicId = map['publicId'];
        needsTransportPass = map['needsTransportPass'];
    }
}

