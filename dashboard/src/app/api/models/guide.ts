export enum EventGuideTypes {
    Bring = "bring",
    Hotel = "hotel",
    Transport = "transport",
    SchoolMap = "school",
    Parking = "parking",
    Restaurants = "restaurant",
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

export interface TranslateWebsite {
    [key: string]: string[];
}

export interface SchoolSection {
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    name: string;
    maps: string[];
    website: TranslateWebsite;
}

export interface Coordinate {
    longitude: number;
    latitude: number;
}

export interface ParkingSection {
    latitude: number;
    longitude: number;
    zoom: number;
    coordinates: Coordinate[];
}

export interface RestaurantCoordinate {
    info: string;
    latitude: number;
    longitude: number;
}

export interface RestaurantSection {
    latitude: number;
    longitude: number;
    zoom: number;
    coordinates: RestaurantCoordinate[];
}
export interface EventGuide {
    bring: BringSection;
    school: SchoolSection;
    hotel: HotelSection;
    parking: ParkingSection;
    restaurant: RestaurantSection;
}
