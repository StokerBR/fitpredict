import 'package:intl/intl.dart';

String getNowDate() {
  var now = DateTime.now();
  return DateFormat('yyyy-MM-dd HH:mm:ss').format(now);
}
