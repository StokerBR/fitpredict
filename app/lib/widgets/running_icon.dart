import 'package:fitpredict/enums/pedestrian_status.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:gif/gif.dart';

class RunningIcon extends StatefulWidget {
  const RunningIcon({
    super.key,
    required this.size,
  });

  final double size;

  @override
  State<RunningIcon> createState() => _RunningIconState();
}

class _RunningIconState extends State<RunningIcon>
    with TickerProviderStateMixin {
  late GifController _controller;

  @override
  void initState() {
    _controller = GifController(vsync: this);

    // Adiciona um listener para quando a animação terminar, ela reiniciar
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _controller.reset();
        _controller.forward();
      }
    });

    // Adiciona um listener para quando o status de movimento mudar
    pedometerService.pedestrianStatus.addListener(() {
      if (pedometerService.pedestrianStatus.value == MovementStatus.walking) {
        // Se o usuário estiver andando, inicia a animação
        _controller.reset();
        _controller.forward();
      } else {
        // Se o usuário não estiver andando, para a animação
        _controller.reset();
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Gif(
      image: const AssetImage('assets/images/running.gif'),
      controller: _controller,
      width: widget.size,
      height: widget.size,
      autostart: Autostart.no,
    );
  }
}
