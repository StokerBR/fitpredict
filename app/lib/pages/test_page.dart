import 'dart:async';

import 'package:fitpredict/enums/pedestrian_status.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/pages/welcome_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';
import 'package:gif/gif.dart';

class TestPage extends StatefulWidget {
  const TestPage({super.key});

  @override
  State<TestPage> createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> with TickerProviderStateMixin {
  late GifController _controller;
  int _steps = 0;
  MovementStatus _status = MovementStatus.stopped;

  @override
  void initState() {
    _controller = GifController(vsync: this);

    pedometerService.stepCount.addListener(() {
      setState(() {
        _steps = pedometerService.stepCount.value;
      });
    });
    pedometerService.pedestrianStatus.addListener(() {
      setState(() {
        _status = pedometerService.pedestrianStatus.value;
      });
    });

    super.initState();
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
                  openLoading(message: 'Sincronizando dados...');
                  Timer(const Duration(seconds: 3), () {
                    closeLoading();
                  });
                },
                child: const Text('Teste loading mensagem'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _controller.reset();
                },
                child: const Text('Pausar gif'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _controller.reset();
                  _controller.forward();
                  _controller.addStatusListener((status) {
                    if (status == AnimationStatus.completed) {
                      _controller.reset();
                      _controller.forward();
                    }
                  });
                },
                child: const Text('Continuar gif'),
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
                _steps.toString(),
                style: const TextStyle(fontSize: 30),
              ),
              const SizedBox(height: 20),
              const Text(
                'Pedestrian Status',
                style: TextStyle(fontSize: 15),
              ),
              Icon(
                _status == MovementStatus.walking
                    ? Icons.directions_walk
                    : Icons.accessibility_new,
                size: 50,
              ),
              Center(
                child: Text(_status.name, style: const TextStyle(fontSize: 30)),
              ),
              Divider(
                height: 50,
                thickness: 1,
                color: AppColors.primary,
              ),
              Gif(
                image: const AssetImage('assets/images/running.gif'),
                controller: _controller,
                width: 20,
                autostart: Autostart.no,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
