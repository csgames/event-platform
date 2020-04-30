import { HttpService, Inject } from "@nestjs/common";
import { Auth0AuthClient } from "../auth0/auth.client";

export class EmailBaseService {
    @Inject()
    protected httpService: HttpService;
    @Inject()
    protected authClient: Auth0AuthClient;

    constructor(private resource: string) {}

    protected url(path = ""): string {
        if (!path) {
            return `${process.env.EMAIL_SERVICE_URL}/${this.resource}`;
        }
        return `${process.env.EMAIL_SERVICE_URL}/${this.resource}/${path}`;
    }

    protected async delete(path = "") {
        return this.httpService.delete(this.url(path), {
            headers: await this.getAuthHeader()
        }).toPromise().then(x => x.data);
    }

    protected async get<T>(path = "") {
        return this.httpService.get<T>(this.url(path), {
            headers: await this.getAuthHeader()
        }).toPromise().then(x => x.data);
    }

    protected async patch<T>(path = "", body: T) {
        return this.httpService.patch<T>(this.url(path), body, {
            headers: await this.getAuthHeader()
        }).toPromise().then(x => x.data);
    }

    protected async post<T>(path = "", body: T) {
        return this.httpService.post<T>(this.url(path), body, {
            headers: await this.getAuthHeader()
        }).toPromise().then(x => x.data);
    }

    protected async put<T>(path = "", body: T) {
        return this.httpService.put<T>(this.url(path), body, {
            headers: await this.getAuthHeader()
        }).toPromise().then(x => x.data);
    }

    protected async getAuthHeader(): Promise<object> {
        const token = await this.authClient.getAccessToken();
        return {
            Authorization: `Bearer ${token}`
        };
    }
}
