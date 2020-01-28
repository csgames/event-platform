import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTemplateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    html: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    variables: object;
}

export class UpdateTemplateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    html: string;

    @IsOptional()
    @IsString()
    description: string;
}
