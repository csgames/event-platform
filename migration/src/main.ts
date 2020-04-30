import * as dotenv from "dotenv";
import { Auth0Service, UserImportData } from "./auth0";
import { PermissionsServices } from "./permissions";
import { UserService } from "./users";

async function main() {
    dotenv.config();

    const auth0 = new Auth0Service();
    const user = new UserService();
    const permission = new PermissionsServices();
    try {
        /*const users = await user.findAll();
        const userImport: UserImportData[] = users.map(x => {
            if (x.Username === "info@csgames.org") {
                return {
                    email: x.Username,
                    email_verified: false,
                    custom_password_hash: {
                        algorithm: "bcrypt",
                        hash: {
                            value: x.Password
                        }
                    },
                    app_metadata: {
                        roles: ["super-admin"]
                    }
                };
            }

            return {
                email: x.Username,
                email_verified: false,
                custom_password_hash: {
                    algorithm: "bcrypt",
                    hash: {
                        value: x.Password
                    }
                }
            };
        });

        await auth0.syncUsers(userImport);*/

        await permission.syncApiPermissions();
        await permission.syncRolePermissions();
        await permission.syncMailPermissions();
    } catch (e) {
        console.log(e);
    }
}

main();
