import 'package:fitpredict/calculator.dart';
import 'package:fitpredict/functions/get_calories_string.dart';
import 'package:fitpredict/functions/get_distance_string.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/theme.dart';
import 'package:fitpredict/widgets/running_icon.dart';
import 'package:flutter/material.dart';

class StepsCard extends StatelessWidget {
  StepsCard({
    super.key,
    required this.title,
    required this.steps,
  });

  final String title;
  final int steps;

  final calculator = Calculator(
    heightCm: loggedUser!.height,
    weightKg: loggedUser!.weight,
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: AppColors.primary.withOpacity(0.05),
        /* color:
            Color.alphaBlend(AppColors.primary.withOpacity(0.05), Colors.white),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ], */
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const RunningIcon(size: 30),
                const SizedBox(width: 10),
                Text(
                  '$steps',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 26,
                  ),
                ),
              ],
            ),
            const Text(
              'passos',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w300,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Tooltip(
                  message: 'Distância',
                  child: Row(
                    children: [
                      const Icon(
                        Icons.pin_drop,
                        color: Colors.green,
                        size: 18,
                      ),
                      const SizedBox(width: 10),
                      Text(
                        // '${(stepsToDistance(_stepsTotal, loggedUser!.height) / 1000).toStringAsFixed(2)} km',
                        getDistanceString(calculator.stepsToDistance(steps)),
                        style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
                Tooltip(
                  message: 'Calorias',
                  child: Row(
                    children: [
                      const Icon(
                        Icons.whatshot_rounded,
                        color: Colors.orange,
                        size: 18,
                      ),
                      const SizedBox(width: 10),
                      Text(
                        getCaloriesString(calculator.stepsToCalories(steps)),
                        style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
