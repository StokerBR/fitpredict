import 'dart:convert';

import 'package:hive/hive.dart';
part 'user.g.dart';
// dart run build_runner build

@HiveType(typeId: 1, adapterName: 'UserAdapter')
class User {
  User({
    required this.name,
    required this.email,
    required this.gender,
    required this.height,
    required this.weight,
    this.totalSteps = 0,
    this.lastDeviceSteps,
    this.lastSync,
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

  @HiveField(5)
  int totalSteps;

  @HiveField(6)
  int? lastDeviceSteps;

  @HiveField(7)
  String? lastSync;

  // Retorna o usuário a partir de um Map
  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      name: map['name'],
      email: map['email'],
      gender: map['gender'],
      height: map['height'],
      weight: map['weight'],
      totalSteps: map['totalSteps'],
      lastSync: map['lastSync'],
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
        'name': name,
        'email': email,
        'gender': gender,
        'height': height,
        'weight': weight,
        'totalSteps': totalSteps,
        'lastSync': lastSync,
      };

  // Retorna um JSON com os dados do usuário
  String toJson() => jsonEncode(toMap());

  // Adiciona os passos do dispositivo aos passos totais, e retorna a diferença
  int addDeviceSteps(int steps) {
    if (lastDeviceSteps == null) {
      lastDeviceSteps = steps;
    } else if (steps < lastDeviceSteps!) {
      lastDeviceSteps = 0;
    }

    int diff = steps - lastDeviceSteps!;
    totalSteps += diff;
    lastDeviceSteps = steps;

    return diff;
  }
}
