// Quantidade de passos a partir da distância (em metros) e altura (em centímetros) da pessoa
int distanceToSteps(double distance, int heightCm) {
  // 1 passo = 0.415 da altura
  double stepLength = heightCm * 0.415;

  // Distância em centímetros
  double distanceCm = distance * 100;

  // Número de passos
  double steps = distanceCm / stepLength;

  return steps.round();
}
