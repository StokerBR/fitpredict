import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/theme.dart';
import 'package:fitpredict/widgets/dialog.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

class FitnessPermissionHandler {
  // Solicita permissão de acesso ao reconhecimento de atividade
  static Future<PermissionStatus> requestPermission() =>
      Permission.activityRecognition.request();

  // Verifica se a permissão foi concedida
  static Future<bool> grantedPermission() async =>
      await requestPermission().isGranted;

  // Solicita permissão de reconhecimento de atividade, ou abre as configurações do app
  // para que o usuário possa permitir manualmente
  static Future<bool> allowPermission([bool openSettings = true]) async {
    // Tenta solicitar a permissão
    if (await grantedPermission()) {
      return true;
    } else if (openSettings && await requestPermission().isPermanentlyDenied) {
      // Abre as configurações do app caso o usuário tenha negado permanentemente
      openAppSettings();
    }
    return false;
  }

  static void showRequestPermissionDialog(BuildContext context) {
    showCustomDialog(
      canPop: false,
      closeButon: false,
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Permissão necessária',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 20),
          RichText(
            text: TextSpan(
              style: AppTheme.themeData.textTheme.bodyMedium!.copyWith(
                color: Colors.grey[600],
              ),
              children: const [
                TextSpan(
                  text: 'É necessário permitir o acesso à ',
                ),
                TextSpan(
                  text: 'sua atividade física',
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                TextSpan(
                  text: ' para continuar.',
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          RichText(
            text: TextSpan(
              style: AppTheme.themeData.textTheme.bodyMedium,
              children: const [
                TextSpan(
                  text: 'Para que o FitPredict funcione corretamente',
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                TextSpan(
                  text:
                      ', é necessário permitir o acesso à sua atividade física.',
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Text(
            'Clique no botão abaixo para permitir (ou caso já tenha permitido).',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              allowPermission().then((value) {
                if (value) {
                  pedometerService.initialize();
                  Navigator.pop(context);
                }
              });
            },
            child: const Text('Permitir'),
          ),
        ],
      ),
    );
    /* showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Permissão necessária'),
          content: const Text(
              'É necessário permitir o acesso ao reconhecimento de atividade para continuar.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                allowPermission();
              },
              child: const Text('Permitir'),
            ),
          ],
        );
      },
    ); */
  }

  // Retorna um botão para solicitar a permissão
/*   Widget getPermissionAlertButton(BuildContext context,
          {EdgeInsetsGeometry? padding}) =>
      ValueListenableBuilder(
        valueListenable: hasPermission,
        builder: (context, value, child) {
          if (value) return Container();
          return Padding(
            padding: padding ?? EdgeInsets.zero,
            child: TextButton(
              onPressed: () {
                allowPermission();
              },
              style: TextButton.styleFrom(
                foregroundColor: AppColors.error600,
              ),
              child: RichText(
                text: TextSpan(
                  style: TextStyle(
                    fontSize: 16,
                    color: AppColors.error600,
                    fontWeight: FontWeight.w500,
                  ),
                  children: [
                    WidgetSpan(
                      alignment: PlaceholderAlignment.middle,
                      child: Icon(
                        Iconsax.warning_2,
                        size: 16,
                        color: AppColors.error600,
                      ),
                    ),
                    const TextSpan(
                      text:
                          ' É necessário permitir o acesso à camera para continuar. ',
                    ),
                    const TextSpan(
                      text: 'Clique aqui para permitir.',
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ); */
}
