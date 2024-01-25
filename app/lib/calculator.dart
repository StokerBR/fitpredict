class Calculator {
  Calculator({
    required this.heightCm,
    required this.weightKg,
  });

  int heightCm;
  int weightKg;

  static const efficiencyFactor = 0.8;
  static const stepLength = 0.415;

  // Distância (em metros) a partir do número de passos
  double stepsToDistance(int steps) {
    // 1 passo = 0.415 da altura
    double stepLength = heightCm * Calculator.stepLength;

    // Distância em centímetros
    double distanceCm = steps * stepLength;

    // Distância em metros
    double distanceMeters = distanceCm / 100;
    return distanceMeters;
  }

  // Quantidade de passos a partir da distância (em metros)
  int distanceToSteps(double distance) {
    // 1 passo = 0.415 da altura
    final double stepLength = heightCm * Calculator.stepLength;

    // Distância em centímetros
    final double distanceCm = distance * 100;

    // Número de passos
    final double steps = distanceCm / stepLength;

    return steps.round();
  }

  // Calorias gastas de acordo com a quantidade de passos
  double stepsToCalories(int steps) {
    final double distanceMeters = stepsToDistance(steps);
    final double distanceKm = distanceMeters / 1000;

    final double calories = distanceKm * weightKg * Calculator.efficiencyFactor;

    return calories;
  }

  // Calorias gastas de acordo com a distância (em metros)
  double distanceToCalories(double distanceMeters) {
    int steps = distanceToSteps(distanceMeters);
    return stepsToCalories(steps);
  }

  // Quantidade de passos a partir das calorias gastas
  int caloriesToSteps(double calories) {
    final double distanceKm =
        calories / (weightKg * Calculator.efficiencyFactor);

    final double distanceMeters = distanceKm * 1000;

    int steps = distanceToSteps(distanceMeters);

    return steps;
  }

  // Distância (em metros) a partir das calorias gastas
  double caloriesToDistance(double calories) {
    int steps = caloriesToSteps(calories);
    return stepsToDistance(steps);
  }

  //--------------------------------------------------

  // Distância (em metros) a partir do número de passos e altura (em centímetros) da pessoa
  static double staticStepsToDistance(int steps, int heightCm) {
    return Calculator(heightCm: heightCm, weightKg: 0).stepsToDistance(steps);
  }

  // Quantidade de passos a partir da distância (em metros)
  static int staticDistanceToSteps(double distance, int heightCm) {
    return Calculator(heightCm: heightCm, weightKg: 0)
        .distanceToSteps(distance);
  }

  // Calorias gastas de acordo com a quantidade de passos
  static double staticStepsToCalories(int steps, int heightCm, int weightKg) {
    return Calculator(heightCm: heightCm, weightKg: weightKg)
        .stepsToCalories(steps);
  }

  // Calorias gastas de acordo com a distância (em metros)
  static double staticDistanceToCalories(
      double distanceMeters, int heightCm, int weightKg) {
    return Calculator(heightCm: heightCm, weightKg: weightKg)
        .distanceToCalories(distanceMeters);
  }

  // Quantidade de passos a partir das calorias gastas
  static int staticCaloriesToSteps(
      double calories, int heightCm, int weightKg) {
    return Calculator(heightCm: heightCm, weightKg: weightKg)
        .caloriesToSteps(calories);
  }

  // Distância (em metros) a partir das calorias gastas
  static double staticCaloriesToDistance(
      double calories, int heightCm, int weightKg) {
    return Calculator(heightCm: heightCm, weightKg: weightKg)
        .caloriesToDistance(calories);
  }
}
