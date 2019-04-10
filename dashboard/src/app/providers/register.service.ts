import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRoleDto } from "../api/dto/registration";
import { Registration } from "../api/models/registration";
import { RegistrationApi } from "../api/registration.api";
import { UserFormDto } from "../components/user-form/dto/user-form.dto";
import { AddTeamFormDto } from "../features/team/team-edit/components/add-team-form/dto/add-team-form.dto";

@Injectable()
export class RegisterService {
    constructor(private registrationApi: RegistrationApi) {}

    public createRegistration(dto: AddTeamFormDto): Observable<Registration> {
        const role = dto.sponsorId ? "sponsor" : "captain";
        return this.registrationApi.createRegistration({
            ...dto,
            role
        });
    }

    public getRegistrationInfo(uuid: string): Observable<Registration> {
        return this.registrationApi.getRegistration(uuid);
    }

    public registerAttendee(uuid: string, userFormDto: UserFormDto): Observable<void> {
        return this.registrationApi.registerAttendee({
            uuid,
            username: userFormDto.username,
            password: userFormDto.password,
            attendee: {
                firstName: userFormDto.firstName,
                lastName: userFormDto.lastName
            }
        });
    }

    public registerRole(dto: RegisterRoleDto): Observable<void> {
        return this.registrationApi.registerRole(dto);
    }
}
