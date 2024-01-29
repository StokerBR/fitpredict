import 'package:intl/intl.dart';

List<String> getCurrentWeekDates() {
  var now = DateTime.now();
  var startFrom =
      now.weekday == 7 ? now : now.subtract(Duration(days: now.weekday));
  var format = DateFormat('yyyy-MM-dd');
  var dates =
      List.generate(7, (i) => format.format(startFrom.add(Duration(days: i))));

  return dates;
}
