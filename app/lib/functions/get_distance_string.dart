String getDistanceString(double distance) {
  if (distance < 1000) {
    return '${distance.toStringAsFixed(2)} m';
  }

  return '${(distance / 1000).toStringAsFixed(2)} km';
}
