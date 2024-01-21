// Distância (em metros) a partir do número de passos e altura (em centímetros) da pessoa
double stepsToDistance(int steps, int heightCm) {
  // 1 passo = 0.415 da altura
  double stepLength = heightCm * 0.415;

  // Distância em centímetros
  double distanceCm = steps * stepLength;

  // Distância em metros
  double distanceMeters = distanceCm / 100;
  return distanceMeters;
}
