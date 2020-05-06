import { environment } from "../../environments/environment";

export class CSGamesApi {
    private readonly API_URL = environment.CSGAMES_API_URL;
    private readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    protected url(route = ""): string {
        if (!route) {
            return `${this.API_URL}/${this.path}`;
        }
        return `${this.API_URL}/${this.path}/${route}`;
    }
}
