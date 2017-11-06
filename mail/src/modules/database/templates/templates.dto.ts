import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTemplateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    template: string;

    @IsOptional()
    @IsString()
    description: string;
}

export class UpdateTemplateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    template: string;

    @IsOptional()
    @IsString()
    description: string;
}
