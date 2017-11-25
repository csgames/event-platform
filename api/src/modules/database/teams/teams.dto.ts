import {
    IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsArray, IsMongoId, ArrayUnique,
    IsOptional
} from "class-validator";

export class CreateOrJoinTeamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId()
    event: string;
}

export class JoinOrLeaveTeamDto {

    @IsMongoId()
    attendeeId: string;

    @IsMongoId()
    teamId: string;
}
