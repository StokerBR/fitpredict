String getDistanceString(double distance) {
  if (distance < 1000) {
    return '${distance.round()} m';
  }

  return '${(distance / 1000).toStringAsFixed(2)} km';
}
