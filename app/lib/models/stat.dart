import 'dart:convert';

import 'package:fitpredict/functions/get_today_date.dart';
import 'package:hive/hive.dart';
part 'stat.g.dart';
// dart run build_runner build

@HiveType(typeId: 2, adapterName: 'StatAdapter')
class Stat {
  Stat({
    required this.date,
    required this.steps,
    required this.distance,
    required this.calories,
    this.lastSync,
  });

  @HiveField(0)
  String date;

  @HiveField(1)
  int steps;

  @HiveField(2)
  int distance;

  @HiveField(3)
  int calories;

  @HiveField(4)
  String? lastSync;

  // Retorna o stat a partir de um Map
  factory Stat.fromMap(Map<String, dynamic> map) {
    return Stat(
      date: map['date'],
      steps: map['steps'],
      distance: map['distance'],
      calories: map['calories'],
      lastSync: map['lastSync'],
    );
  }

  // Retorna o stat a partir de um JSON
  factory Stat.fromJson(String json) {
    return Stat.fromMap(jsonDecode(json));
  }

  // Retorna o stat de uma data salvo no Hive
  static Stat? fromBox(String date) {
    var box = Hive.box<Stat>('stats');
    return box.get(date);
  }

  // Salva o stat no Hive
  void saveToBox() {
    var box = Hive.box<Stat>('stats');
    box.put(date, this);
  }

  // Retorna um Map com os dados do stat
  Map<String, dynamic> toMap() {
    return {
      'date': date,
      'steps': steps,
      'distance': distance,
      'calories': calories,
      'lastSync': lastSync,
    };
  }

  // Retorna um JSON com os dados do stat
  String toJson() => json.encode(toMap());

  // Retorna o stat do dia atual
  static Stat getTodayStat() {
    String todayDate = getTodayDate();

    // Obtém o stat do dia atual
    Stat? stat = Stat.fromBox(todayDate);

    // Se não existir, cria um novo
    if (stat == null) {
      stat = Stat(
        date: todayDate,
        steps: 0,
        distance: 0,
        calories: 0,
      );
      stat.saveToBox();
    }

    return stat;
  }
}
