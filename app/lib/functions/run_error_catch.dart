import 'dart:io';

import 'package:dio/dio.dart';
import 'package:fitpredict/functions/get_error_message.dart';
import 'package:fitpredict/widgets/alert.dart';

dynamic runErrorCatch(
  dynamic e,
  String defaultErrorMessage, [
  dynamic errorReturn,
]) {
  if (e is DioException) {
    if (e.response != null) {
      String? error = e.response!.data is String
          ? e.response!.data
          : getErrorMessage(e.response!.data);

      if (error != null) {
        showError(error);
        return errorReturn;
      }
    } else if (e.error is SocketException) {
      showError(
          'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.');
      return errorReturn;
    }
  }
  showError(defaultErrorMessage);
}
