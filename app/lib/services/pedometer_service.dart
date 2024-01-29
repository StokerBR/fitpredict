import 'dart:async';

import 'package:fitpredict/calculator.dart';
import 'package:fitpredict/enums/pedestrian_status.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/goal.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hive/hive.dart';
import 'package:pedometer/pedometer.dart';

class PedometerService {
  bool isInitialized = false;
  ValueNotifier<int> stepCount = ValueNotifier<int>(0);
  ValueNotifier<MovementStatus> pedestrianStatus =
      ValueNotifier<MovementStatus>(MovementStatus.stopped);

  Timer? _saveStepsTimer;
  int _pendingSteps = 0;

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

    // Adiciona os passos ao usuário e obtém a diferença
    int addedSteps = loggedUser!.addDeviceSteps(steps);
    // Adiciona os passos ao total de passos do dia
    currentStat!.steps += addedSteps;

    // Atualiza o valor da contagem de passos
    stepCount.value = steps;

    if (addedSteps > 0) {
      _saveStepsTimer?.cancel();
      _pendingSteps += addedSteps;

      // Salva os passos a cada 20 passos ou 3 segundos (para evitar muitas gravações)
      if (_pendingSteps >= 20) {
        _saveSteps();
      } else {
        _saveStepsTimer = Timer(const Duration(seconds: 3), _saveSteps);
      }
    }
  }

  // Salva os passos
  void _saveSteps() {
    // Atualiza o usuário no Hive
    loggedUser!.saveToBox();

    final calculator = Calculator(
      heightCm: loggedUser!.height,
      weightKg: loggedUser!.weight,
    );

    // Atualiza o stat no Hive
    currentStat!.calories =
        calculator.stepsToCalories(currentStat!.steps).round();
    currentStat!.distance =
        calculator.stepsToDistance(currentStat!.steps).round();
    currentStat!.saveToBox();

    // Atualiza as metas
    Hive.box<Goal>('goals')
        .values
        .where((e) => e.completedAt == null && e.deleted == false)
        .forEach((goal) {
      if (_pendingSteps + goal.stepsWalked > goal.steps) {
        goal.stepsWalked = goal.steps;
      } else {
        goal.stepsWalked += _pendingSteps;
      }

      if (goal.stepsWalked == goal.steps) {
        goal.complete();
      }

      goal.saveToBox();
    });

    _pendingSteps = 0;
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
