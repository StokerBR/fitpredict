import 'package:intl/intl.dart';

// Converte uma data de um formato para outro
String convertDate(String inputFormat, String outputFormat, String date) {
  DateFormat inputDateFormat = DateFormat(inputFormat);
  DateTime parsedDate = inputDateFormat.parse(date);
  DateFormat outputDateFormat = DateFormat(outputFormat);
  return outputDateFormat.format(parsedDate);
}
