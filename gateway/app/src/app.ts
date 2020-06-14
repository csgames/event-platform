import * as redisStore from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as http from "http";
import * as httpProxy from "http-proxy-middleware";
import * as logger from "morgan";
import * as fetch from "node-fetch";
import * as path from "path";
import * as querystring from "querystring";
import * as redis from "redis";
import { appConfig } from "./app-config";
import { proxyConfig } from "./proxy-config";
import { Auth } from "./route/auth";


export class Application {
    public app: express.Application;

    public static bootstrap(): Application {
        return new Application();
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.use(logger("dev"));
        this.app.use(cors({
            allowedHeaders: ["content-type", "event-id", "if-none-match", "ngsw-bypass"],
            credentials: true,
            origin: process.env.APP_URL.split(" ")
        }));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(express.static(path.join(__dirname, "../public")));

        const redisClient = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        });

        redisClient.on("error", function (err) {
            console.log("Error " + err);
        });

        const store = redisStore(session);
        this.app.use(session({
            name: "csgames-session",
            store: new store({ client: redisClient }),
            resave: false,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                secure: process.env.IS_HTTPS !== "false",
                httpOnly: true,
                path: "/"
            }
        }));

        this.app.use(function (req, res, next) {
            res.setHeader("X-XSS-Protection", "1; mode=block");
            res.setHeader("Content-security-policy", appConfig.contentSecurityPolicy);
            res.setHeader("X-frame-options", appConfig.xFrameOptions);
            res.setHeader("X-content-type", appConfig.xContentType);
            if (process.env.IS_HTTPS !== "false") {
                res.setHeader("Strict-transport-security", appConfig.strictTransportSecurity);
            }
            return next();
        });

        this.app.disable("x-powered-by");
    }

    public routes() {
        this.app.use(this.renewToken.bind(this));
        let proxy = proxyConfig();

        this.app.use(httpProxy.createProxyMiddleware(proxy.path, {
            target: proxy.path,
            router: proxy.options.router,
            logLevel: proxy.options.logLevel,
            onProxyReq: this.onRequest,
            changeOrigin: true,
            ws: true,
            ignorePath: true
        }));
        const auth: Auth = new Auth();

        this.app.use(process.env.GATEWAY_BASE_PATH, auth.router);
    }

    private async renewToken(req: express.Request, res: express.Response, next) {
        if (req.session && req.session.access_token && req.session.access_token_expiration) {
            const now = new Date().getTime() / 1000;
            if (req.session.refresh_token) {
                if (now >= req.session.access_token_expiration) {
                    await this.setSessionNewToken(req);

                    if (req.session && req.session.access_token) {
                        const accessTokenDetails = JSON.parse(
                            Buffer.from(req.session.access_token.split(".")[1], "base64").toString()
                        );
                        req.session.access_token_expiration = accessTokenDetails.exp;
                    } else {
                        // probleme au renouvellement de la session, likely refresh token invvalide, must login
                        res.sendStatus(401);
                        return;
                    }
                }
            } else {
                // drop session invalide must login
                res.sendStatus(401);
                return;
            }
        }
        next();
    }

    private onRequest(proxyReq: http.ClientRequest, req: express.Request, res: express.Response) {
        proxyReq.removeHeader("Cookie");
        if (req.session.access_token) {
            proxyReq.setHeader("Authorization", `Bearer ${req.session.access_token}`);
        }
    }

    private async setSessionNewToken(req: express.Request) {
        let body = querystring.stringify({
            client_id: process.env.STS_CLIENT_ID,
            client_secret: process.env.STS_CLIENT_SECRET,
            scope: process.env.STS_CLIENT_SCOPES,
            refresh_token: req.session.refresh_token,
            grant_type: "refresh_token"
        });

        try {
            const response = await fetch(`${process.env.STS_URL}/token`, {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(r => {
                if (r.status === 200) {
                    return r.json();
                }
                return null;
            });

            if (response) {
                req.session.access_token = response.access_token;
                req.session.refresh_token = response.refresh_token;
            } else {
                req.session.destroy(err => console.log(err));
            }
        } catch (e) {
            req.session.destroy(err => console.log(err));
        }
    }
}
