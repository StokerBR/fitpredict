import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';

// Exibe o loading
void openLoading({bool allowBack = false, String? message}) {
  loadingRoute = DialogRoute(
    context: navigatorKey.currentState!.context,
    builder: (context) => WillPopScope(
      onWillPop: () async => allowBack,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircularProgressIndicator(
              color: AppColors.blue[600],
            ),
            if (message != null) ...[
              const SizedBox(height: 20),
              Text(
                message,
                style: AppTheme.themeData.textTheme.bodyMedium!.copyWith(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  shadows: [
                    const Shadow(
                      color: Colors.black,
                      offset: Offset(0, 0),
                      blurRadius: 5,
                    ),
                  ],
                ),
              ),
            ]
          ],
        ),
      ),
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
