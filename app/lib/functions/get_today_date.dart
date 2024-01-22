import 'package:intl/intl.dart';

String getTodayDate() {
  var now = DateTime.now();
  return DateFormat('yyyy-MM-dd').format(now);
}
