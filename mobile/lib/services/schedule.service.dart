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
        return dates;
    }

    static List<String> getSortedKeysForDaySchedule(Map<String, List<Activity>> daySchedule) {
        var list = new List<String>.from(daySchedule.keys.toList());
        list.sort((t1, t2) {
            var activity1 = daySchedule[t1].first;
            var activity2 = daySchedule[t2].first;
            return activity1.beginDate.compareTo(activity2.beginDate);
        });
        return list;
    }
}