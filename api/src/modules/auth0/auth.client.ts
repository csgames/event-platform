import { Injectable } from "@nestjs/common";
import { AuthenticationClient, ManagementClient, TokenResponse } from "auth0";
import { ConfigService } from "../configs/config.service";

@Injectable()
export class Auth0AuthClient {
    private grant: TokenResponse;
    public readonly client: AuthenticationClient;

    constructor(protected readonly configService: ConfigService) {
        this.client = new AuthenticationClient(this.configService.auth0);
    }

    public async getAccessToken(): Promise<string> {
        if (this.validateAccessToken()) {
            return this.grant.access_token;
        }

        this.grant = await this.fetchAccessToken();
        return this.grant.access_token;
    }

    private async fetchAccessToken(): Promise<TokenResponse> {
        return await this.client.clientCredentialsGrant({
            audience: "https://api.csgames.org/mail"
        });
    }

    private validateAccessToken(): boolean {
        if (!this.grant) {
            return false;
        }

        // Extract payload from jwt token
        const payload = JSON.parse(Buffer.from(this.grant.access_token.split(".")[1], "base64").toString());
        const exp = payload.exp;
        const now = new Date().getTime() / 1000;
        return now < exp;
    }
}
