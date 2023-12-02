import 'dart:convert';

import 'package:hive/hive.dart';

@HiveType(typeId: 0)
class User {
  User({
    required this.name,
    required this.email,
    required this.gender,
    required this.height,
    required this.weight,
  });

  @HiveField(0)
  final String name;

  @HiveField(1)
  final String email;

  @HiveField(2)
  final String gender;

  @HiveField(3)
  final int height;

  @HiveField(4)
  final int weight;

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
    final userBox = Hive.box<User>('userBox');
    return userBox.get('user');
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
