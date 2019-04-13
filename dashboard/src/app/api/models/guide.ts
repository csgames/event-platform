export enum EventGuideTypes {
    Bring = "bring",
    Hotel = "hotel",
    Transport = "transport",
    School = "school",
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

export interface TranslateInfo {
    [key: string]: string[];
}

export interface SchoolSection {
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    name: string;
    maps: string[];
    website: TranslateInfo;
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

export interface TransportationSection {
    info: TranslateInfo;
    hotel: string;
    school: string;
    image: string;
    hotelLatitude: number;
    hotelLongitude: number;
    schoolLatitude: number;
    schoolLongitude: number;
}
export interface EventGuide {
    bring: BringSection;
    school: SchoolSection;
    hotel: HotelSection;
    parking: ParkingSection;
    restaurant: RestaurantSection;
    transport: TransportationSection;
}
