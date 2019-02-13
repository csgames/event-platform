import { environment } from "../../environments/environment";

export class IdentityApi {
    private readonly API_URL = environment.IDENTITY_URL;
    private readonly path: string;
    
    constructor(path: string) {
        this.path = path;
    }

    protected url(route = ""): string {
        return `${this.API_URL}/${this.path}/${route}`;
    }
}
