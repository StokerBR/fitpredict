import 'dart:convert';

import 'package:fitpredict/functions/get_now_date.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:hive/hive.dart';

part 'goal.g.dart';
// dart run build_runner build

@HiveType(typeId: 3, adapterName: 'GoalAdapter')
class Goal {
  Goal({
    this.id,
    this.key,
    required this.steps,
    required this.distance,
    required this.calories,
    this.stepsWalked = 0,
    this.lastSync,
    this.completedAt,
    this.deleted = false,
  }) : super() {
    // Se a key não for informada, assume o valor do id ou gera um uuid
    key ??= DateTime.now().microsecondsSinceEpoch.toString();
  }

  @HiveField(0)
  int? id;

  @HiveField(1)
  String? key;

  @HiveField(2)
  int steps;

  @HiveField(3)
  int distance;

  @HiveField(4)
  int calories;

  @HiveField(5)
  int stepsWalked;

  @HiveField(6)
  String? lastSync;

  @HiveField(7)
  String? completedAt;

  @HiveField(8)
  bool deleted;

  // Retorna o goal a partir de um Map
  factory Goal.fromMap(Map<String, dynamic> map) {
    return Goal(
      id: map['id'],
      key: map['key'],
      steps: map['steps'],
      distance: map['distance'],
      calories: map['calories'],
      stepsWalked: map['stepsWalked'],
      lastSync: map['lastSync'],
      completedAt: map['completedAt'],
    );
  }

  // Retorna o goal a partir de um JSON
  factory Goal.fromJson(String json) {
    return Goal.fromMap(jsonDecode(json));
  }

  // Retorna o goal salvo no Hive
  static Goal? fromBox(String key) {
    var box = Hive.box<Goal>('goals');
    return box.get(key);
  }

  // Salva o goal no Hive
  void saveToBox() {
    lastSync = getNowDate();

    var box = Hive.box<Goal>('goals');
    box.put(key, this);
  }

  // Retorna um Map com os dados do goal
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'key': key,
      'steps': steps,
      'distance': distance,
      'calories': calories,
      'stepsWalked': stepsWalked,
      'lastSync': lastSync,
      'completedAt': completedAt,
      'deleted': deleted,
    };
  }

  // Retorna um JSON com os dados do goal
  String toJson() => json.encode(toMap());

  // Deleta o goal
  void delete() {
    // Se o goal existe na API, apenas marca como deletado, senão deleta do Hive
    if (id != null) {
      deleted = true;
      saveToBox();
    } else {
      var box = Hive.box<Goal>('goals');
      box.delete(key);
    }
  }

  // Completa o goal
  void complete() {
    completedAt = getNowDate();
    showSuccess('Parabéns, você completou a meta de $steps passos!');
  }
}
