import 'package:PolyHxApp/domain/activity.dart';
import 'package:intl/intl.dart';

class ScheduleService {
  Map<String, Map<String, List<Activity>>> getActivitiesPerDay(List<Activity> activities, String code) {
    var daysFormatter = DateFormat.MMMMd(code);
    var timeFormattter = DateFormat.jm(code);
    DateFormat.jm();
    Map<String, Map<String, List<Activity>>> dates = {};
    for (var activity in activities) {
      var date = daysFormatter.format(activity.beginDate);
      var time = timeFormattter.format(activity.beginDate);
      dates[date] ??= {};
      dates[date][time] ??= [];
      dates[date][time].add(activity);
    }
    for (var day in dates.keys) {
      for (var time in dates[day].keys) {
        dates[day][time].sort((Activity a1, Activity a2) => a1.beginDate.compareTo(a2.beginDate));
      }
    }
    return dates;
  }
}