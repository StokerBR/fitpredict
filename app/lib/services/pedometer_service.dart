import 'dart:async';

import 'package:fitpredict/enums/pedestrian_status.dart';
import 'package:fitpredict/functions/steps_to_calories.dart';
import 'package:fitpredict/functions/steps_to_distance.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pedometer/pedometer.dart';

class PedometerService {
  bool isInitialized = false;
  ValueNotifier<int> stepCount = ValueNotifier<int>(0);
  ValueNotifier<MovementStatus> pedestrianStatus =
      ValueNotifier<MovementStatus>(MovementStatus.stopped);

  Timer? _saveStepsTimer;

  // Inicializa o serviço de contagem de passos
  void initialize() {
    if (isInitialized) return;

    // Inicializa a stream de contagem de passos
    var stepCountStream = Pedometer.stepCountStream;
    stepCountStream.listen(_onStepCount,
        onError: _onStepCountError, cancelOnError: true);

    // Inicializa a stream de status de movimento
    var pedestrianStatusStream = Pedometer.pedestrianStatusStream;
    pedestrianStatusStream.listen(_onPedestrianStatus, cancelOnError: true);
    isInitialized = true;
  }

  // Atualiza a contagem de passos do usuário
  void _onStepCount(StepCount event) {
    int steps = event.steps;
    stepCount.value = steps;

    // Adiciona os passos ao usuário e obtém a diferença
    int addedSteps = loggedUser!.addDeviceSteps(steps);
    // Adiciona os passos ao total de passos do dia
    currentStat!.steps += addedSteps;

    if (addedSteps > 0) {
      _saveStepsTimer?.cancel();

      // Salva os passos no Hive após 3 segundos (para evitar muitas gravações)
      _saveStepsTimer = Timer(const Duration(seconds: 3), () {
        // Atualiza o usuário no Hive
        loggedUser!.saveToBox();

        // Atualiza o stat no Hive
        currentStat!.calories = stepsToCalories(steps).round();
        currentStat!.distance =
            stepsToDistance(steps, loggedUser!.height).round();
        currentStat!.saveToBox();
      });
    }
  }

  // Caso o dispositivo não suporte a contagem de passos
  void _onStepCountError(error) {
    showDialog(
      context: navigatorKey.currentState!.overlay!.context,
      builder: (context) => AlertDialog(
        title: const Text('Erro ao obter passos'),
        content: const Text(
          'O seu dispositivo não suporta a contagem de passos. Como o FitPredict precisa dessa funcionalidade para funcionar corretamente, o aplicativo será fechado.',
        ),
        actions: [
          TextButton(
            onPressed: () {
              SystemChannels.platform.invokeMethod('SystemNavigator.pop');
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  // Atualiza o status de movimento do usuário
  void _onPedestrianStatus(PedestrianStatus event) {
    pedestrianStatus.value = event.status == 'walking'
        ? MovementStatus.walking
        : MovementStatus.stopped;
  }
}
