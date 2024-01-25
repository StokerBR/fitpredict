import 'package:another_flushbar/flushbar.dart';
import 'package:flutter/material.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/theme.dart';

showAlert(String message, {String? type, Function()? onTap}) {
  if (message == '{message: Unauthenticated.}') {
    message = 'Login expirado!';
  }

  IconData icon = Icons.warning;
  Color color = AppColors.blue[600]!;

  if (type == 'success') {
    icon = Icons.check;
    color = Colors.green[600]!;
  } else if (type == 'error') {
    icon = Icons.error;
    color = Colors.red[600]!;
  }

  Flushbar(
    titleColor: Colors.white,
    messageColor: Colors.white,
    titleSize: 21,
    messageSize: 16,
    message: message,
    flushbarPosition: FlushbarPosition.TOP,
    flushbarStyle: FlushbarStyle.FLOATING,
    reverseAnimationCurve: Curves.decelerate,
    forwardAnimationCurve: Curves.ease,
    backgroundColor: AppColors.blue[900]!,
    borderRadius: const BorderRadius.all(Radius.circular(20)),
    padding: const EdgeInsets.all(20),
    margin: const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
    boxShadows: kElevationToShadow[6],
    isDismissible: true,
    animationDuration: const Duration(milliseconds: 500),
    duration: Duration(seconds: type == 'success' ? 2 : 5),
    icon: Icon(
      icon,
      color: color,
    ),
    onTap: (_) => onTap,
  ).show(navigatorKey.currentState!.overlay!.context);
}

showSuccess(String message, {Function()? onTap}) {
  showAlert(message, type: 'success', onTap: onTap);
}

showError(String message, {Function()? onTap}) {
  showAlert(message, type: 'error', onTap: onTap);
}
