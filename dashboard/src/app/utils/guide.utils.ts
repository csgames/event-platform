import { EventGuideTypes } from "../api/models/guide";

export namespace GuideUtils {
    export function getGuideTypeIconClass(type: string): string {
        switch (type) {
            case EventGuideTypes.Bring:
                return "fal fal-4x fa-clipboard-check";
            case EventGuideTypes.Hotel:
                return "fal fal-4x fa-hotel";
            case EventGuideTypes.Transport: 
                return "fal fal-4x fa-subway";
            case EventGuideTypes.School: 
                return "fal fal-4x fa-graduation-cap";
            case EventGuideTypes.Parking:
                return "fal fal-4x fa-parking";
            case EventGuideTypes.Restaurants:
                return "fal fal-4x fa-utensils";
        }
    }
}
