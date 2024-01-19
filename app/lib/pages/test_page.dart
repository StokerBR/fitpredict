import 'dart:async';

import 'package:fitpredict/pages/login_page.dart';
import 'package:fitpredict/pages/register_page.dart';
import 'package:fitpredict/pages/welcome_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';
import 'package:pedometer/pedometer.dart';

class TestPage extends StatefulWidget {
  const TestPage({super.key});

  @override
  State<TestPage> createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  late Stream<StepCount> _stepCountStream;
  late Stream<PedestrianStatus> _pedestrianStatusStream;
  String _status = '?', _steps = '?';

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  void onStepCount(StepCount event) {
    try {
      print(event);
      setState(() {
        _steps = event.steps.toString();
      });
    } catch (e) {}
  }

  void onPedestrianStatusChanged(PedestrianStatus event) {
    print(event);
    setState(() {
      _status = event.status;
    });
  }

  void onPedestrianStatusError(error) {
    print('onPedestrianStatusError: $error');
    setState(() {
      _status = 'Pedestrian Status not available';
    });
    print(_status);
  }

  void onStepCountError(error) {
    try {
      print('onStepCountError: $error');
      setState(() {
        _steps = 'Step Count not available';
      });
    } catch (e) {}
  }

  void initPlatformState() {
    try {
      _pedestrianStatusStream = Pedometer.pedestrianStatusStream;
      _pedestrianStatusStream
          .listen(onPedestrianStatusChanged)
          .onError(onPedestrianStatusError);

      _stepCountStream = Pedometer.stepCountStream;
      _stepCountStream.listen(onStepCount,
          onError: onStepCountError, cancelOnError: true);
    } catch (e) {
      print(e);
    }

    if (!mounted) return;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Página de teste'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const WelcomePage(),
                    ),
                  );
                },
                child: const Text('Ir para welcome'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const RegisterPage(),
                    ),
                  );
                },
                child: const Text('Ir para cadastro'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const LoginPage(),
                    ),
                  );
                },
                child: const Text('Ir para login'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  openLoading(message: 'Sincronizando dados...');
                  Timer(const Duration(seconds: 3), () {
                    closeLoading();
                  });
                },
                child: const Text('Teste loading mensagem'),
              ),
              Divider(
                height: 50,
                thickness: 1,
                color: AppColors.primary,
              ),
              const Text(
                'Steps Taken',
                style: TextStyle(fontSize: 15),
              ),
              Text(
                _steps,
                style: const TextStyle(fontSize: 30),
              ),
              const SizedBox(height: 20),
              const Text(
                'Pedestrian Status',
                style: TextStyle(fontSize: 15),
              ),
              Icon(
                _status == 'walking'
                    ? Icons.directions_walk
                    : _status == 'stopped'
                        ? Icons.accessibility_new
                        : Icons.error,
                size: 50,
              ),
              Center(
                child: Text(
                  _status,
                  style: _status == 'walking' || _status == 'stopped'
                      ? const TextStyle(fontSize: 30)
                      : const TextStyle(fontSize: 10, color: Colors.red),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
