// Calorias gastas de acordo com a quantidade de passos
double stepsToCalories(int steps) {
  // 1 passo = 0.03 a 0.04 calorias
  double caloriesPerStep = 0.035;

  // Calorias
  double calories = steps * caloriesPerStep;

  return calories;
}
