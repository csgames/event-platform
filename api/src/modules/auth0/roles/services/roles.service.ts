import { Injectable } from "@nestjs/common";
import { Auth0ManagementClient } from "../../management.client";
import { Permission, PermissionData, Role } from "auth0";

@Injectable()
export class RolesService extends Auth0ManagementClient {
    private readonly paging = 100;

    public async getAllRoles(): Promise<Role[]> {
        return this.client.getRoles();
    }

    public async getRolePermissions(id: string): Promise<Permission[]> {
        const permissions: Permission[] = [];
        let page = 0;
        let permissionsRes: Permission[];
        do {
            /**
             * Auth0 has a paging of 50 by default
             */
            permissionsRes = await this.client.getPermissionsInRole({
                id,
                per_page: this.paging,
                page
            });
            permissions.push(...permissionsRes);
            page++;
        } while (permissionsRes.length >= this.paging);

        return permissions;
    }
}
