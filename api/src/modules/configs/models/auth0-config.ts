import { AuthenticationClientOptions } from "auth0";

export class Auth0Config implements AuthenticationClientOptions {
    public defaultConnection: string;
    public clientId: string;
    public clientSecret: string;
    public domain: string;

    constructor() {
        this.defaultConnection = process.env.AUTH0_DEFAULT_CONNECTION;
        this.clientId = process.env.AUTH0_CLIENT_ID;
        this.clientSecret = process.env.AUTH0_CLIENT_SECRET;
        this.domain = process.env.AUTH0_CLIENT_DOMAIN;
    }
}
