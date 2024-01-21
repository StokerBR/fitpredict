import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/handlers/fitness_permission_handler.dart';
import 'package:fitpredict/pages/home_page.dart';
import 'package:fitpredict/pages/profile_page.dart';
import 'package:fitpredict/pages/test_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int currentPageIndex = 0;

  @override
  void initState() {
    FitnessPermissionHandler.allowPermission(false).then((value) {
      if (!value) {
        FitnessPermissionHandler.showRequestPermissionDialog(context);
      } else {
        pedometerService.initialize();
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: NavigationBar(
          onDestinationSelected: (int index) {
            setState(() {
              currentPageIndex = index;
            });
          },
          indicatorColor: AppColors.primary,
          selectedIndex: currentPageIndex,
          labelBehavior: NavigationDestinationLabelBehavior.onlyShowSelected,
          indicatorShape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(10)),
          ),
          destinations: const <Widget>[
            NavigationDestination(
              selectedIcon: Icon(Icons.code),
              icon: Icon(Icons.code_outlined),
              label: 'Teste',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.home),
              icon: Icon(Icons.home_outlined),
              label: 'Home',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.whatshot),
              icon: Icon(Icons.whatshot_outlined),
              label: 'Metas',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.person),
              icon: Icon(Icons.person_outline),
              label: 'Perfil',
            ),
          ],
        ),
        body: IndexedStack(
          index: currentPageIndex,
          children: <Widget>[
            // Teste
            const TestPage(),

            // Home
            const HomePage(),

            // Metas
            Scaffold(
              appBar: AppBar(
                title: const Text('Metas'),
              ),
              body: const Center(
                child: Text('Metas'),
              ),
            ),

            // Perfil
            const ProfilePage(),
          ],
        )
        /* body: <Widget>[
        const HomePage(),

        // Metas
        Scaffold(
          appBar: AppBar(
            title: const Text('Metas'),
          ),
          body: const Center(
            child: Text('Metas'),
          ),
        ),

        // Perfil
        Scaffold(
          appBar: AppBar(
            title: const Text('Perfil'),
          ),
          body: const Center(
            child: Text('Perfil'),
          ),
        ),
      ][currentPageIndex], */
        );
  }
}
