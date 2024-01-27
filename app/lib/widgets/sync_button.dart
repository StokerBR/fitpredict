import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/services/sync_service.dart';
import 'package:flutter/material.dart';

class SyncButton extends StatefulWidget {
  const SyncButton({super.key});

  @override
  State<SyncButton> createState() => _SyncButtonState();
}

class _SyncButtonState extends State<SyncButton> with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    // Reinicia a animação quando ela termina
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _controller.reset();
        _controller.forward();
      }
    });

    // Anima o botão de sincronização quando está sincronizando
    isSyncing.addListener(() {
      if (isSyncing.value) {
        _controller.forward();
      } else {
        _controller.reset();
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () {
        SyncService.sync();
      },
      icon: RotationTransition(
        turns: Tween(begin: 1.0, end: 0.0).animate(_controller),
        child: const Icon(Icons.sync),
      ),
      tooltip: 'Sincronizar dados',
    );
  }
}
