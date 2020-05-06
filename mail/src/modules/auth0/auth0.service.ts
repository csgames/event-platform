import { Injectable } from "@nestjs/common";
import { RolesService } from "./roles/services/roles.service";

@Injectable()
export class Auth0Service {
    constructor(
        private readonly rolesService: RolesService
    ) {}

    public get roles(): RolesService {
        return this.rolesService;
    }
}
