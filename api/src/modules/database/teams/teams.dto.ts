import { IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsArray, IsMongoId, ArrayUnique } from "class-validator";

export class CreateTeamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(4)
    @ArrayUnique()
    @IsMongoId({ each: true })
    attendees: string[];

    @IsMongoId()
    event: string;
}

export class JoinOrLeaveTeamDto {

    @IsMongoId()
    attendeeId: string;

    @IsMongoId()
    teamId: string;
}
