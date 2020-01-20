import { Injectable } from "@angular/core";
import { IdentityApi } from "./identity.api";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CustomEncoder } from "../utils/custom.encoder";
import { Observable } from "rxjs";
import { ChangePasswordDto } from "../features/dashboard/modals/change-password/dto/change-password.dto";

@Injectable()
export class UserApi extends IdentityApi {
    constructor(private http: HttpClient) {
        super("user");
    }

    public changePassword(dto: ChangePasswordDto): Observable<void> {
        const body = new HttpParams({
            encoder: new CustomEncoder()
        }).set("oldPassword", dto.oldPassword).set("newPassword", dto.newPassword);
        return this.http.put<void>(this.url(), body.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            withCredentials: true
        });
    }
}
