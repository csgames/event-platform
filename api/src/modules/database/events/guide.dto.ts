import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { EventGuideTypes } from "./events.model";

export class GuideBringDto {
    @ArrayNotEmpty()
    @IsArray()
    fr: string[];

    @ArrayNotEmpty()
    @IsArray()
    en: string[];
}

export class TranslateDto {
    @IsString()
    @IsNotEmpty()
    fr: string;

    @IsString()
    @IsNotEmpty()
    en: string;
}


export class CoordinateDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}

export class GuideSchoolDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsNumber()
    @IsNotEmpty()
    zoom: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @ArrayNotEmpty()
    @IsArray()
    maps: string[];

    @ValidateNested()
    @Type(() => TranslateDto)
    website: TranslateDto;
}

export class GuideHotelDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsNumber()
    @IsNotEmpty()
    zoom: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class GuideParkingDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsNumber()
    @IsNotEmpty()
    zoom: number;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CoordinateDto)
    coordinates: CoordinateDto[];
}

export class RestaurantCoordinateDto {
    @IsString()
    @IsNotEmpty()
    info: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}

export class GuideRestaurantDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsNumber()
    @IsNotEmpty()
    zoom: number;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => RestaurantCoordinateDto)
    coordinates: RestaurantCoordinateDto[];
}

export class GuideTransportDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TranslateDto)
    info: TranslateDto;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    school: string;

    @IsString()
    @IsNotEmpty()
    hotel: string;

    @IsNumber()
    @IsNotEmpty()
    schoolLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    schoolLongitude: number;

    @IsNumber()
    @IsNotEmpty()
    hotelLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    hotelLongitude: number;
}

export class GuideDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => GuideBringDto)
    bring: GuideBringDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GuideSchoolDto)
    school: GuideSchoolDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GuideHotelDto)
    hotel: GuideHotelDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GuideParkingDto)
    parkings: GuideParkingDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GuideRestaurantDto)
    restaurant: GuideRestaurantDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GuideTransportDto)
    transport: GuideTransportDto;
}

export class AddGuideSectionDto {
    @IsString()
    @IsIn(Object.values(EventGuideTypes))
    @IsNotEmpty()
    type: string;
}
