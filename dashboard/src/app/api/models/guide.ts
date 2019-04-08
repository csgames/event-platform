export enum EventGuideTypes {
    Bring = "bring",
    Hotel = "hotel",
    GraduationCap = "graduationCap",
    SchoolMap = "schoolMap",
    Parking = "parking",
    Restaurants = "restaurants"
}

export interface BringSection {
    [key: string]: string[];
}

export interface EventGuide {
    bring: BringSection;
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
