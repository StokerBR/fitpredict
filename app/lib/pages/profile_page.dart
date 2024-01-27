import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/pages/user_page.dart';
import 'package:fitpredict/services/auth_service.dart';
import 'package:fitpredict/widgets/menu_bar.dart';
import 'package:fitpredict/widgets/sync_button.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil'),
        actions: const [SyncButton()],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: ValueListenableBuilder(
              valueListenable: Hive.box<User>('user').listenable(),
              builder: (context, value, child) {
                User? user = value.get('user');

                if (user == null) {
                  return const Center(
                    child: Text('Usuário não encontrado'),
                  );
                }

                // A primeira, ou duas primeiras (se tiver), letras do nome do usuário
                String userInitials = user.name
                    .split(' ')
                    .map((e) => e.isNotEmpty ? e.substring(0, 1) : '')
                    .take(2)
                    .join()
                    .toUpperCase();

                return Row(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: Colors.grey[400],
                      child: Text(
                        userInitials,
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      flex: 1,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            user.name,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            user.email,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
          CustomMenuBar(
            icon: Icons.person_rounded,
            name: 'Dados Pessoais',
            action: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const UserPage(),
                ),
              );
            },
          ),
          CustomMenuBar(
            icon: Icons.logout_rounded,
            name: 'Sair do app',
            action: () {
              // AuthService.logout();
              showDialog(
                context: navigatorKey.currentState!.overlay!.context,
                builder: (context) => AlertDialog(
                  title: const Text('Sair do app'),
                  content: const Text(
                    'Tem certeza que deseja deslogar do app? Todos os dados não sincronizados serão perdidos.',
                  ),
                  actions: [
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancelar'),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(
                          navigatorKey.currentState!.overlay!.context,
                        );
                        AuthService.logout(true);
                      },
                      child: const Text('Sair'),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
