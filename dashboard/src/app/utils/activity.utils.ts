import { ActivityTypes } from "../api/models/activity";

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
}
