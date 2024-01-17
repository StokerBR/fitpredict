import 'package:flutter/material.dart';

class InputLabel extends StatelessWidget {
  const InputLabel(
    this.label, {
    super.key,
    this.style,
    this.fontSize = 14,
  });

  final String label;
  final TextStyle? style;
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Align(
        alignment: Alignment.centerLeft,
        child: Text(
          label,
          textAlign: TextAlign.left,
          style: style ??
              TextStyle(
                fontSize: fontSize,
                fontWeight: FontWeight.w500,
                color: Colors.grey[800],
              ),
        ),
      ),
      // const SizedBox(height: 10),
    ]);
  }
}
