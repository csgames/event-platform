// format de la configuration: https://github.com/chimurai/http-proxy-middleware#options option.router
import * as http from "http";
import * as url from "url";

export type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

export interface ProxyRouterConfig {
    path_starts_with: string;
    redirect: string;
    path_without?: string;
    path_to_replace?: string;
    path_replace_by?: string;
}

export interface ProxyConfig {
    path: string;
    options: {
        target: string;
        router: (req: http.IncomingMessage) => string;
        logLevel: LogLevel;
    }
}

export const proxyConfig = (): ProxyConfig => {
    const config = require(process.env.PROXY_CONFIG_PATH);
    const router: Array<ProxyRouterConfig> = config.router;
    const routerFunction = (req: http.IncomingMessage): string => {
        if (!req.url) {
            return null;
        }

        let urlParts = url.parse(req.url);
        for (let i = 0; i < router.length; ++i) {
            if (urlParts.path.startsWith(config.path + router[i].path_starts_with) && router[i].redirect) {
                if (router[i].path_without) {
                    urlParts.path = urlParts.path.replace(router[i].path_without, "");
                }
                if (router[i].path_to_replace && router[i].path_replace_by) {
                    urlParts.path = urlParts.path.replace(router[i].path_to_replace, router[i].path_replace_by);
                }
                let slash = urlParts.path[0] === "/" ? "" : "/";
                return router[i].redirect + slash + urlParts.path;
            }
        }
        return req.url;
    };

    return {
        path: config.path,
        options: {
            // TODO: secure: true
            target: config.target,
            router: routerFunction,
            logLevel: config.logLevel

        }
    };
};
