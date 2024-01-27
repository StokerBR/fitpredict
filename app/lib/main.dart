import 'dart:async';

import 'package:fitpredict/functions/get_today_date.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/goal.dart';
import 'package:fitpredict/models/stat.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/pages/main_page.dart';
import 'package:fitpredict/pages/welcome_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  initializeDateFormatting('pt_BR', null);

  // Inicia o Hive
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  Hive.registerAdapter(StatAdapter());
  Hive.registerAdapter(GoalAdapter());
  await Hive.openBox<User>('user');
  await Hive.openBox<String>('token');
  await Hive.openBox<Stat>('stats');
  await Hive.openBox<Goal>('goals');

  // Obtém o stat do dia atual
  currentStat = Stat.getTodayStat();

  // Mudar currentStat quando mudar o dia
  Timer.periodic(const Duration(minutes: 1), (timer) async {
    if (currentStat != null && currentStat!.date != getTodayDate()) {
      currentStat!.saveToBox();
      currentStat = Stat.getTodayStat();
    }
  });

  // Mantém a orientação do app como portrait
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  // Inicia o app
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  Widget getInitialPage() {
    loggedUser = Hive.box<User>('user').get('user');

    if (loggedUser == null) {
      return const WelcomePage();
    }

    return const MainPage();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitPredict',
      home: getInitialPage(),
      theme: AppTheme.themeData,
      navigatorKey: navigatorKey,
      debugShowCheckedModeBanner: false,
    );
  }
}
