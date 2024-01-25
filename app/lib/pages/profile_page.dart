import 'package:fitpredict/enums/gender_enum.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/user.dart';
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

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Dados do usuário:',
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      'Nome: ${user.name}',
                      style: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'E-mail: ${user.email}',
                      style: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'Sexo: ${GenderEnum.values.where((e) => e.value == user.gender).firstOrNull?.name ?? ''}',
                      style: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'Altura: ${user.height}cm',
                      style: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'Peso: ${user.weight}kg',
                      style: const TextStyle(
                        fontSize: 16,
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
              /* Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ProfilePage(),
                ),
              ); */
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
