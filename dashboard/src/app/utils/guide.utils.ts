import { EventGuideTypes } from "../api/models/guide";

export namespace GuideUtils {
    export function getGuideTypeIconClass(type: string): string {
        switch (type) {
            case EventGuideTypes.Checklist:
                return "fal fal-4x fa-clipboard-check";
            case EventGuideTypes.Hotel:
                return "fal fal-4x fa-hotel";
            case EventGuideTypes.GraduationCap: 
                return "fal fal-4x fa-graduation-cap";
            case EventGuideTypes.SchoolMap:
                return "fal fal-4x fa-map-marked-alt";
            case EventGuideTypes.Parking:
                return "fal fal-4x fa-parking";
            case EventGuideTypes.Restaurants:
                return "fal fal-4x fa-utensils";
        }
    }
}
