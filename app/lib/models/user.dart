import 'dart:convert';

import 'package:hive/hive.dart';
part 'user.g.dart';

@HiveType(typeId: 1, adapterName: 'UserAdapter')
class User {
  User({
    required this.name,
    required this.email,
    required this.gender,
    required this.height,
    required this.weight,
  });

  @HiveField(0)
  String name;

  @HiveField(1)
  String email;

  @HiveField(2)
  String gender;

  @HiveField(3)
  int height;

  @HiveField(4)
  int weight;

  // Retorna o usuário a partir de um Map
  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      name: map['name'],
      email: map['email'],
      gender: map['gender'],
      height: map['height'],
      weight: map['weight'],
    );
  }

  // Retorna o usuário a partir de um JSON
  factory User.fromJson(String json) {
    return User.fromMap(jsonDecode(json));
  }

  // Retorna o usuário salvo no Hive
  static User? fromBox() {
    final userBox = Hive.box<User>('user');
    return userBox.get('user');
  }

  // Salva o usuário no Hive
  void saveToBox() {
    final userBox = Hive.box<User>('user');
    userBox.put('user', this);
  }

  // Retorna um Map com os dados do usuário
  Map<String, dynamic> toMap() => {
        "name": name,
        "email": email,
        "gender": gender,
        "height": height,
        "weight": weight,
      };

  // Retorna um JSON com os dados do usuário
  String toJson() => jsonEncode(toMap());
}
