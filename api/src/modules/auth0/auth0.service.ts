import { Injectable } from "@nestjs/common";
import { RolesService } from "./roles/services/roles.service";
import { UsersService } from "./users/services/users.service";

@Injectable()
export class Auth0Service {
    constructor(
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService
    ) {}

    public get roles(): RolesService {
        return this.rolesService;
    }

    public get users(): UsersService {
        return this.usersService;
    }
}
