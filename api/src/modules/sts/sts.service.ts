import { Component, HttpStatus } from "@nestjs/common";
import fetch from "node-fetch";
import { Response } from "node-fetch";
import * as querystring from "querystring";
import { UserModel } from "./user.model";
import { HttpException } from "@nestjs/core";

@Component()
export class STSService {
    private STS_URL = process.env.STS_URL;
    private STS_CLIENT_ID = process.env.STS_CLIENT_ID;
    private STS_CLIENT_SECRET = process.env.STS_CLIENT_SECRET;

    private accessToken: string;

    public async validateTokens(): Promise<boolean> {
        if (!this.accessToken) {
            return await this.renewToken();
        }

        // Extract payload from jwt token
        let payload = JSON.parse(Buffer.from(this.accessToken.split(".")[1], "base64").toString());
        let exp = payload.exp;
        let now = new Date().getTime() / 1000;

        if (now >= exp) {
            return await this.renewToken();
        }

        return true;
    }

    async renewToken() {
        let newToken = await this.getAccessToken();
        if (newToken) {
            this.accessToken = newToken;
        }
        return !!newToken;
    }

    async getAccessToken(): Promise<string> {
        let body = querystring.stringify({
            client_id: this.STS_CLIENT_ID,
            client_secret: this.STS_CLIENT_SECRET,
            scope: "sts_api",
            grant_type: "client_credentials"
        });

        try {
            let res = await fetch(`${this.STS_URL}/connect/token`, {
                method: "POST",
                body: body,
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }).then(r => r.json());
            return res.access_token;
        } catch (e) {
            return null;
        }
    }

    public async registerUser(user: UserModel) {
        if (!await this.validateTokens()) {
            throw new Error("Error while retrieving token from STS.");
        }

        let body = querystring.stringify(user);
        let res = await fetch(`${this.STS_URL}/register`, {
            method: "POST",
            body: body,
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    public async updateUserPassword(username: string, oldPassword: string, newPassword: string) {
        if (newPassword.length < 6) {
            throw new HttpException("Password must be at least 6 characters.", HttpStatus.BAD_REQUEST);
        }

        if (!await this.validateTokens()) {
            throw new Error("Error while retrieving token from STS.");
        }

        let body = querystring.stringify({
            username,
            oldPassword,
            newPassword
        });
        let res: Response = await fetch(`${this.STS_URL}/register/password`, {
            method: "PUT",
            body: body,
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (!res.ok) {
            if (res.status === HttpStatus.BAD_REQUEST) {
                throw new HttpException("Wrong old password.", HttpStatus.BAD_REQUEST);
            } else {
                throw new Error("Unknown error.");
            }
        }
    }
}
