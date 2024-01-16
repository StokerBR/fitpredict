import 'package:fitpredict/global_variables.dart';
import 'package:flutter/material.dart';

// Exibe o loading
void openLoading({bool allowBack = false}) {
  loadingRoute = DialogRoute(
    context: navigatorKey.currentState!.context,
    builder: (context) => WillPopScope(
      onWillPop: () async => allowBack,
      child: const Center(child: CircularProgressIndicator()),
    ),
    barrierDismissible: false,
  );
  Navigator.of(navigatorKey.currentState!.overlay!.context).push(loadingRoute!);
}

// Fecha o loading
void closeLoading() {
  if (loadingRoute != null) {
    Navigator.of(navigatorKey.currentState!.context).removeRoute(loadingRoute!);
    loadingRoute = null;
    // loadingRoute!.navigator!.pop();
  }
}
