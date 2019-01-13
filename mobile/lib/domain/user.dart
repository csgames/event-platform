class User {
  String id;
  String username;
  String email;
  String password;
  String firstName;
  String lastName;
  String birthDate;
  List<dynamic> permissions;
  String role;
  String roleId;
  bool isActive;
  bool validated;

  User();

  User.from(User user) {
    copy(user, this);
  }

  User.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    username = map['username'];
    email = map['email'];
    password = map['password'];
    firstName = map['firstName'];
    lastName = map['lastName'];
    birthDate = map['birthDate'];
    permissions = map['permissions'];
    role = map['role'];
    roleId = map['roleId'];
    isActive = map['isActive'];
    validated = map["validated"];
  }

  User.fromToken(Map<String, dynamic> token) {
    firstName = token['firstname'];
    lastName = token['lastname'];
    username = token['name'];
    id = token['user_id'];
    role = token['role'];
  }

  static void copy(User from, User to) {
    to
      ..id = from.id
      ..username = from.username
      ..email = from.email
      ..password = from.password
      ..firstName = from.firstName
      ..lastName = from.lastName
      ..birthDate = from.birthDate
      ..permissions = from.permissions
      ..role = from.role
      ..roleId = from.roleId
      ..isActive = from.isActive
      ..validated = from.validated;
  }
}
