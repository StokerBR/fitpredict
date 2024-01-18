import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/pages/main_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  await Hive.openBox<User>('user');
  await Hive.openBox<String>('token');
  await Hive.openBox<String>('userLogin');

  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitPredict',
      home: const MainPage(),
      theme: AppTheme.themeData,
      navigatorKey: navigatorKey,
      debugShowCheckedModeBanner: false,
    );
  }
}
