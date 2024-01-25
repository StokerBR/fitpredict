import 'dart:async';

import 'package:fitpredict/functions/run_error_catch.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/goal.dart';
import 'package:fitpredict/models/stat.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:hive/hive.dart';

class SyncService {
  static Future<void> sync() async {
    isSyncing.value = true;
    openLoading(message: 'Sincronizando dados...');

    Map<String, dynamic> payload = {
      'user': User.fromBox()?.toMap(),
      'goals': Hive.box<Goal>('goals').values.toList().map((goal) {
        return goal.toMap();
      }).toList(),
      'stats': Hive.box<Stat>('stats').values.toList().map((stat) {
        return stat.toMap();
      }).toList(),
    };

    try {
      var res = await HttpService.post('sync', payload);

      if (res.statusCode == 200 || res.statusCode == 201) {
        closeLoading();

        Map<String, dynamic> data = res.data;

        if (data['user'] != null &&
            data['stats'] != null &&
            data['goals'] != null) {
          // Limpar dados locais
          await Hive.box<Goal>('goals').clear();
          await Hive.box<Stat>('stats').clear();

          // Atualizar usuário
          loggedUser = User.fromMap(data['user']);
          loggedUser!.saveToBox();

          // Salvar estatísticas
          for (Map<String, dynamic> stat in data['stats']) {
            Stat statObj = Stat.fromMap(stat);
            statObj.saveToBox();
          }
          currentStat = Stat.getTodayStat();

          // Salvar metas
          for (Map<String, dynamic> goal in data['goals']) {
            Goal goalObj = Goal.fromMap(goal);
            goalObj.saveToBox();
          }
        }
      }
    } catch (e) {
      closeLoading();
      runErrorCatch(e,
          'Não foi possível sincronizar os dados. Tente novamente mais tarde.');
    }

    isSyncing.value = false;
  }
}
