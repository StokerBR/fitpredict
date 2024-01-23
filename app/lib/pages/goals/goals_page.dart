import 'package:fitpredict/calculator.dart';
import 'package:fitpredict/functions/convert_date.dart';
import 'package:fitpredict/functions/get_calories_string.dart';
import 'package:fitpredict/functions/get_distance_string.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/goal.dart';
import 'package:fitpredict/pages/goals/goal_form_page.dart';
import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

class GoalsPage extends StatefulWidget {
  const GoalsPage({super.key});

  @override
  State<GoalsPage> createState() => _GoalsPageState();
}

class _GoalsPageState extends State<GoalsPage> {
  final Calculator calculator = Calculator(
    heightCm: loggedUser!.height,
    weightKg: loggedUser!.weight,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Metas'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: CustomScrollView(
          slivers: [
            SliverFillRemaining(
              hasScrollBody: false,
              child: ValueListenableBuilder(
                valueListenable: Hive.box<Goal>('goals').listenable(),
                builder: (context, value, child) {
                  List<Goal> goals = value.values.toList().cast<Goal>();

                  if (goals.isEmpty) {
                    return const Center(
                      child: Text(
                        'Nenhuma meta encontrada.\nCrie uma e comece a caminhar!',
                        textAlign: TextAlign.center,
                      ),
                    );
                  }

                  return Column(
                    children: [
                      const SizedBox(height: 20),
                      ...goals.reversed
                          .map(
                            (goal) => getGoalCard(goal),
                          )
                          .toList(),
                      const SizedBox(height: 75),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const GoalFormPage(),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget getGoalCard(Goal goal) {
    double percentWalked = goal.stepsWalked / goal.steps;
    if (percentWalked > 1) {
      percentWalked = 1;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 15),
      /* color: goal.completedAt != null
          ? Color.alphaBlend(
              Colors.green.withOpacity(0.2),
              Colors.white,
            )
          : null, */
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Row(
          children: [
            CircularPercentIndicator(
              radius: 40,
              lineWidth: 8,
              animation: true,
              percent: percentWalked,
              center: Text(
                '${(percentWalked * 100).toStringAsFixed(0)}%',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              footer: Text(
                '${goal.stepsWalked} / ${goal.steps}',
                style: const TextStyle(
                  fontWeight: FontWeight.w300,
                  fontSize: 10,
                ),
              ),
              circularStrokeCap: CircularStrokeCap.round,
              progressColor:
                  goal.completedAt != null ? Colors.green : AppColors.primary,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Tooltip(
                    message: 'Passos',
                    child: Row(
                      children: [
                        Icon(
                          Icons.directions_walk_rounded,
                          color: AppColors.primary,
                          size: 18,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          goal.steps.toString(),
                          style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 5),
                  Tooltip(
                    message: 'Distância',
                    child: Row(
                      children: [
                        const Icon(
                          Icons.pin_drop,
                          color: Colors.green,
                          size: 18,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          getDistanceString(
                              calculator.stepsToDistance(goal.steps)),
                          style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 5),
                  Tooltip(
                    message: 'Calorias',
                    child: Row(
                      children: [
                        const Icon(
                          Icons.whatshot_rounded,
                          color: Colors.orange,
                          size: 18,
                        ),
                        const SizedBox(width: 5),
                        Text(
                          getCaloriesString(
                              calculator.stepsToCalories(goal.steps)),
                          style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (goal.completedAt != null) ...[
                    const SizedBox(height: 5),
                    Tooltip(
                      message: 'Completada em',
                      child: Row(
                        children: [
                          Icon(
                            Icons.check_box,
                            color: AppColors.blue[600],
                            size: 18,
                          ),
                          const SizedBox(width: 5),
                          Text(
                            convertDate('yyyy-MM-dd HH:mm:ss',
                                'dd/MM/yyyy HH:mm', goal.completedAt!),
                            style: const TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ]
                ],
              ),
            ),
            Column(
              children: [
                if (goal.completedAt == null) ...[
                  IconButton(
                    icon: const Icon(Icons.edit),
                    iconSize: 15,
                    color: AppColors.primary.withOpacity(0.8),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => GoalFormPage(goalKey: goal.key),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 20),
                ],
                IconButton(
                  icon: const Icon(Icons.delete),
                  iconSize: 15,
                  color: Colors.grey.withOpacity(0.8),
                  onPressed: () {
                    // goal.delete();
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Excluir meta'),
                        content: const Text(
                          'Tem certeza que deseja excluir esta meta?',
                        ),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text('Cancelar'),
                          ),
                          TextButton(
                            onPressed: () {
                              goal.delete();
                              Navigator.of(context).pop();
                            },
                            child: const Text('Excluir'),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
