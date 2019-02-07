import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api/api.service";
import { ChangePasswordDto } from "../dto/change-password.dto";

@Injectable()
export class UserService {
    constructor(private api: ApiService) { }

    public changePassword(dto: ChangePasswordDto) {
        return this.api.user.changePassword(dto);
    }
}