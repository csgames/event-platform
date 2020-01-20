import { environment } from "../../environments/environment";

export class GatewayApi {
    private readonly API_URL = environment.GATEWAY_URL;

    protected url(route = ""): string {
        return `${this.API_URL}/${route}`;
    }
}
