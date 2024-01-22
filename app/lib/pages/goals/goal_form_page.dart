import 'package:fitpredict/calculator.dart';
import 'package:fitpredict/functions/get_calories_string.dart';
import 'package:fitpredict/functions/get_distance_string.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/goal.dart';
import 'package:fitpredict/theme.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/input.dart';
import 'package:fitpredict/widgets/radio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class GoalFormPage extends StatefulWidget {
  const GoalFormPage({
    super.key,
    this.goalKey,
  });

  final String? goalKey;

  @override
  State<GoalFormPage> createState() => _GoalFormPageState();
}

class _GoalFormPageState extends State<GoalFormPage> {
  Goal? _goal;

  String type = 'steps';

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool autoValidate = false;

  final TextEditingController _stepsController = TextEditingController();
  final TextEditingController _distanceController = TextEditingController();
  final TextEditingController _caloriesController = TextEditingController();

  final Calculator _calculator = Calculator(
    heightCm: loggedUser!.height,
    weightKg: loggedUser!.weight,
  );

  int? _calculatedSteps;
  double? _calculatedDistance;
  double? _calculatedCalories;

  // Calcula os valores para passos
  void _calculateForSteps() {
    if (_stepsController.text.isNotEmpty) {
      int steps = int.parse(_stepsController.text);
      setState(() {
        _calculatedSteps = null;
        _calculatedDistance = _calculator.stepsToDistance(steps);
        _calculatedCalories = _calculator.stepsToCalories(steps);
      });
    } else {
      setState(() {
        _calculatedSteps = null;
        _calculatedDistance = null;
        _calculatedCalories = null;
      });
    }
  }

  // Calcula os valores para distância
  void _calculateForDistance() {
    if (_distanceController.text.isNotEmpty) {
      double distance = double.parse(_distanceController.text);
      setState(() {
        _calculatedSteps = _calculator.distanceToSteps(distance);
        _calculatedDistance = null;
        _calculatedCalories = _calculator.distanceToCalories(distance);
      });
    } else {
      setState(() {
        _calculatedSteps = null;
        _calculatedDistance = null;
        _calculatedCalories = null;
      });
    }
  }

  // Calcula os valores para calorias
  void _calculateForCalories() {
    if (_caloriesController.text.isNotEmpty) {
      double calories = double.parse(_caloriesController.text);
      setState(() {
        _calculatedSteps = _calculator.caloriesToSteps(calories);
        _calculatedDistance = _calculator.caloriesToDistance(calories);
        _calculatedCalories = null;
      });
    } else {
      setState(() {
        _calculatedSteps = null;
        _calculatedDistance = null;
        _calculatedCalories = null;
      });
    }
  }

  void _submit() {
    setState(() {
      autoValidate = true;
    });
    if (_formKey.currentState!.validate()) {
      int steps = type == 'steps'
          ? int.parse(_stepsController.text)
          : _calculatedSteps!;
      int distance = type == 'distance'
          ? int.parse(_distanceController.text)
          : _calculatedDistance!.round();
      int calories = type == 'calories'
          ? int.parse(_caloriesController.text)
          : _calculatedCalories!.round();

      if (_goal == null) {
        _goal = Goal(
          steps: steps,
          distance: distance,
          calories: calories,
        );
      } else {
        _goal!.steps = steps;
        _goal!.distance = distance;
        _goal!.calories = calories;
      }

      _goal!.saveToBox();

      Navigator.pop(context);
      showSuccess('Meta salva com sucesso!');
    }
  }

  @override
  void initState() {
    if (widget.goalKey != null) {
      _goal = Goal.fromBox(widget.goalKey!);

      _stepsController.text = _goal!.steps.toString();
      _distanceController.text = _goal!.distance.toString();
      _caloriesController.text = _goal!.calories.toString();

      _calculateForSteps();
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.goalKey != null ? 'Editar' : 'Criar'} meta'),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        behavior: HitTestBehavior.opaque,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CustomRadio(
                    labelString: 'Passos',
                    value: 'steps',
                    groupValue: type,
                    onChanged: (value) {
                      setState(() {
                        type = value;
                      });
                      _calculateForSteps();
                    },
                  ),
                  CustomRadio(
                    labelString: 'Distância',
                    value: 'distance',
                    groupValue: type,
                    onChanged: (value) {
                      setState(() {
                        type = value;
                      });
                      _calculateForDistance();
                    },
                  ),
                  CustomRadio(
                    labelString: 'Calorias',
                    value: 'calories',
                    groupValue: type,
                    onChanged: (value) {
                      setState(() {
                        type = value;
                      });
                      _calculateForCalories();
                    },
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Form(
                key: _formKey,
                autovalidateMode: autoValidate
                    ? AutovalidateMode.always
                    : AutovalidateMode.disabled,
                child: Builder(
                  builder: (context) {
                    switch (type) {
                      case 'steps':
                        return CustomInput(
                          key: const Key('steps'),
                          controller: _stepsController,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                          ],
                          labelText: 'Passos',
                          maxLength: 6,
                          onChanged: (value) {
                            _calculateForSteps();
                          },
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Insira a quantidade de passos';
                            }
                            return null;
                          },
                        );
                      case 'distance':
                        return CustomInput(
                          key: const Key('distance'),
                          controller: _distanceController,
                          keyboardType: TextInputType.number,
                          labelText: 'Distância (m)',
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                          ],
                          maxLength: 6,
                          onChanged: (value) {
                            _calculateForDistance();
                          },
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Insira a distância a ser percorrida';
                            }
                            return null;
                          },
                        );
                      case 'calories':
                        return CustomInput(
                          key: const Key('calories'),
                          controller: _caloriesController,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                          ],
                          labelText: 'Calorias (kcal)',
                          maxLength: 6,
                          onChanged: (value) {
                            _calculateForCalories();
                          },
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Insira a quantidade de calorias';
                            }
                            return null;
                          },
                        );
                      default:
                        return Container();
                    }
                  },
                ),
              ),
              const SizedBox(height: 20),
              if (_calculatedSteps != null) ...[
                Row(
                  children: [
                    Icon(
                      Icons.directions_walk_rounded,
                      color: AppColors.primary,
                      size: 18,
                    ),
                    const SizedBox(width: 10),
                    Text(
                      'Passos estimados: ${_calculatedSteps!}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
              ],
              if (_calculatedDistance != null) ...[
                Row(
                  children: [
                    const Icon(
                      Icons.pin_drop,
                      color: Colors.green,
                      size: 18,
                    ),
                    const SizedBox(width: 10),
                    Text(
                      'Distância estimada: ${getDistanceString(_calculatedDistance!)}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
              ],
              if (_calculatedCalories != null) ...[
                Row(
                  children: [
                    const Icon(
                      Icons.whatshot_rounded,
                      color: Colors.orange,
                      size: 18,
                    ),
                    const SizedBox(width: 10),
                    Text(
                      'Calorias estimadas: ${getCaloriesString(_calculatedCalories!)}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ],
              const Expanded(
                child: SizedBox(height: 20),
              ),
              ElevatedButton(
                onPressed: _submit,
                child: const Text('Salvar Meta'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
