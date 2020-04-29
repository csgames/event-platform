import { ManagementClient } from "auth0";

export interface UserImportData {
    email: string;
    email_verified: boolean;
    custom_password_hash: {
        algorithm: "bcrypt",
        hash: {
            value: string;
        }
    };
    app_metadata?: {
        roles?: string[];
    };
}

export class Auth0Service {
    public client: ManagementClient;

    constructor() {
        this.client = new ManagementClient({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN
        });
    }

    public async syncUsers(users: UserImportData[]): Promise<void> {
        await this.client.importUsers({
            connection_id: process.env.AUTH0_CONNECTION_ID,
            users_json: JSON.stringify(users),
            upsert: true
        })
    }
}
