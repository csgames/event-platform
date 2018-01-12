class User {
  String id;
  String username;
  String email;
  String password;
  String firstName;
  String lastName;
  String birthDate;
  List<String> permissions;
  String role;
  String roleId;
  bool isActive;
  bool validated;

  User();

  User.from(User user) {
    copy(user, this);
  }

  static void copy(User from, User to) {
    to
      ..firstName = from.firstName
      ..lastName = from.lastName
      ..birthDate = from.birthDate
      ..email = from.email
      ..username = from.username
      ..id = from.id
      ..isActive = from.isActive
      ..validated = from.validated
      ..role = from.role
      ..roleId = from.roleId
      ..permissions = from.permissions;
  }
}
