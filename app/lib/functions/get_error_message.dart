// Obtém a mensagem de erro da API
String? getErrorMessage(Map<String, dynamic> responseData) {
  if (responseData['message'] != null) {
    if (responseData['message'] is String) {
      return responseData['message'];
    } else if (responseData['message'] is List) {
      return responseData['message'][0];
    }
  }

  return null;
}
