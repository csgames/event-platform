export enum EventGuideTypes {
    Checklist = "checklist", 
    Hotel = "hotel",
    GraduationCap = "graduationCap",
    SchoolMap = "schoolMap",
    Parking = "parking",
    Restaurants = "restaurants"
}
export interface EventGuide {
    bring: { [key: string]: string[] };
    school: {
        latitude: number,
        longitude: number,
        zoom: number,
        address: string,
        name: string,
        maps: [string]
    };
    hotel: {
        latitude: number,
        longitude: number,
        zoom: number,
        address: string,
        name: string
    };
    parkings: {
        latitude: number,
        longitude: number,
        zoom: number,
        coordinates: [ { 
            latitude: number,
            longitude: number
        }]
    };
    restaurant: {
        latitude: number,
        longitude: number,
        zoom: number,
        coordinates: [{ 
            info: string,
            latitude: number,
            longitude: number
        }]
    };
}
