import 'dart:async';

import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/widgets/steps_card.dart';
import 'package:fitpredict/widgets/sync_button.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with TickerProviderStateMixin {
  int _stepsTotal = loggedUser!.totalSteps;
  int _stepsToday = currentStat!.steps;

  void _updateSteps() {
    if (mounted) {
      setState(() {
        _stepsTotal = loggedUser!.totalSteps;
        _stepsToday = currentStat!.steps;
      });
    }
  }

  @override
  void initState() {
    // Atualiza os passos quando a contagem de passos é atualizada
    pedometerService.stepCount.addListener(() {
      _updateSteps();
    });

    // Atualiza os passos quando a sincronização é finalizada
    isSyncing.addListener(() {
      if (!isSyncing.value) {
        _updateSteps();
      }
    });

    // Também atualiza os passos uma vez depois 1 segundos para garantir que os dados foram carregados corretamente
    Timer(const Duration(seconds: 1), () {
      _updateSteps();
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FitPredict'),
        actions: const [SyncButton()],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            StepsCard(title: 'Hoje', steps: _stepsToday),
            const SizedBox(height: 20),
            StepsCard(title: 'Total', steps: _stepsTotal),
          ],
        ),
      ),
    );
  }
}
