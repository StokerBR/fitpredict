String getCaloriesString(double calories) {
  if (calories < 1000) {
    return '${calories.round()} cal';
  }

  return '${(calories / 1000).toStringAsFixed(2)} kcal';
}
