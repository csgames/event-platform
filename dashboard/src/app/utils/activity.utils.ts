import { ActivityTypes, CreateActivity } from "../api/models/activity";

export namespace ActivityUtils {
    export function getActivityTypeIconClass(type: string): string {
        switch (type) {
            case ActivityTypes.General:
                return "fal fal-4x fa-calendar";
            case ActivityTypes.Meal:
                return "fal fal-4x fa-utensils";
            case ActivityTypes.Competition: 
                return "fal fal-4x fa-trophy";
        }
    }

    export function createTimeActivity(activity: CreateActivity): CreateActivity {
        const beginDate = (activity.beginDate as Date);
        beginDate.setHours(
            (activity.beginTime as Date).getHours(),
            (activity.beginTime as Date).getMinutes(), 
            0
        );
        const endDate = (activity.endDate as Date);
        endDate.setHours(
            (activity.endTime as Date).getHours(),
            (activity.endTime as Date).getMinutes(),
            0
        );
        return activity = {
            ... activity,
            beginDate: beginDate,
            endDate: endDate
        };
    }
}
