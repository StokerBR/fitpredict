// Quantidade de passos a partir das calorias gastas
int caloriesToSteps(double calories) {
  // 1 passo = 0.03 a 0.04 calorias
  double caloriesPerStep = 0.035;

  // Número de passos
  double steps = calories / caloriesPerStep;

  return steps.round();
}
