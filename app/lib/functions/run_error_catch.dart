import 'package:dio/dio.dart';
import 'package:fitpredict/functions/get_error_message.dart';
import 'package:fitpredict/widgets/alert.dart';

dynamic runErrorCatch(dynamic e, String defaultErrorMessage,
    [dynamic errorReturn]) {
  if (e is DioException && e.response != null) {
    String? error = e.response!.data is String
        ? e.response!.data
        : getErrorMessage(e.response!.data);

    if (error != null) {
      showError(error);
      return errorReturn;
    }
  }
  showError(defaultErrorMessage);
}
