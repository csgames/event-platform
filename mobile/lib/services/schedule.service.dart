import 'package:PolyHxApp/domain/activity.dart';
import 'package:intl/intl.dart';

class ScheduleService {
  Map<String, List<Activity>> getActivitiesPerDay(List<Activity> activities, String code) {
    var formatter = DateFormat.MMMMd(code);
    Map<String, List<Activity>> dates = {};
    for (var activity in activities) {
      var date = formatter.format(activity.beginDate);
      dates[date] ??= [];
      dates[date].add(activity);
    }
    for (var day in dates.keys) {
      dates[day].sort((Activity a1, Activity a2) => a1.beginDate.compareTo(a2.beginDate));
    }
    return dates;
  }
}