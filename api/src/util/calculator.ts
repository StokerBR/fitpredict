class Calculator {
  heightCm: number;
  weightKg: number;

  static readonly efficiencyFactor = 0.8;
  static readonly stepLength = 0.415;

  constructor(heightCm: number, weightKg: number) {
    this.heightCm = heightCm;
    this.weightKg = weightKg;
  }

  // Distância (em metros) a partir do número de passos
  stepsToDistance(steps: number): number {
    let stepLength = this.heightCm * Calculator.stepLength;
    let distanceCm = steps * stepLength;
    let distanceMeters = distanceCm / 100;
    return distanceMeters;
  }

  // Quantidade de passos a partir da distância (em metros)
  distanceToSteps(distance: number): number {
    let stepLength = this.heightCm * Calculator.stepLength;
    let distanceCm = distance * 100;
    let steps = distanceCm / stepLength;
    return Math.round(steps);
  }

  // Calorias gastas de acordo com a quantidade de passos
  stepsToCalories(steps: number): number {
    let distanceMeters = this.stepsToDistance(steps);
    let distanceKm = distanceMeters / 1000;
    let calories = distanceKm * this.weightKg * Calculator.efficiencyFactor;
    return calories;
  }

  // Calorias gastas de acordo com a distância (em metros)
  distanceToCalories(distanceMeters: number): number {
    let steps = this.distanceToSteps(distanceMeters);
    return this.stepsToCalories(steps);
  }

  // Quantidade de passos a partir das calorias gastas
  caloriesToSteps(calories: number): number {
    let distanceKm = calories / (this.weightKg * Calculator.efficiencyFactor);
    let distanceMeters = distanceKm * 1000;
    let steps = this.distanceToSteps(distanceMeters);
    return steps;
  }

  // Distância (em metros) a partir das calorias gastas
  caloriesToDistance(calories: number): number {
    let steps = this.caloriesToSteps(calories);
    return this.stepsToDistance(steps);
  }

  //-------------------- Static methods --------------------

  // Distância (em metros) a partir do número de passos
  static staticStepsToDistance(steps: number, heightCm: number): number {
    return new Calculator(heightCm, 0).stepsToDistance(steps);
  }

  // Quantidade de passos a partir da distância (em metros)
  static staticDistanceToSteps(distance: number, heightCm: number): number {
    return new Calculator(heightCm, 0).distanceToSteps(distance);
  }

  // Calorias gastas de acordo com a quantidade de passos
  static staticStepsToCalories(
    steps: number,
    heightCm: number,
    weightKg: number,
  ): number {
    return new Calculator(heightCm, weightKg).stepsToCalories(steps);
  }

  // Calorias gastas de acordo com a distância (em metros)
  static staticDistanceToCalories(
    distanceMeters: number,
    heightCm: number,
    weightKg: number,
  ): number {
    return new Calculator(heightCm, weightKg).distanceToCalories(
      distanceMeters,
    );
  }

  // Quantidade de passos a partir das calorias gastas
  static staticCaloriesToSteps(
    calories: number,
    heightCm: number,
    weightKg: number,
  ): number {
    return new Calculator(heightCm, weightKg).caloriesToSteps(calories);
  }

  // Distância (em metros) a partir das calorias gastas
  static staticCaloriesToDistance(
    calories: number,
    heightCm: number,
    weightKg: number,
  ): number {
    return new Calculator(heightCm, weightKg).caloriesToDistance(calories);
  }
}
