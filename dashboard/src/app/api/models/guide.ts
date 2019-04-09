export enum EventGuideTypes {
    Bring = "bring",
    Hotel = "hotel",
    GraduationCap = "transport",
    SchoolMap = "school",
    Parking = "parking",
    Restaurants = "restaurant"
}

export interface BringSection {
    [key: string]: string[];
}

export interface HotelSection {
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    name: string;
}

export interface SchoolSection {
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    name: string;
    maps: [string];
}

export interface ParkingSection {
    latitude: number;
    longitude: number;
    zoom: number;
    coordinates: [{
        latitude: number,
        longitude: number
    }];
}

export interface EventGuide {
    bring: BringSection;
    school: SchoolSection;
    hotel: HotelSection;
    parkings: ParkingSection;
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
