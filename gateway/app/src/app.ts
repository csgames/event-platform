import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as redisStore from 'connect-redis';
import * as httpProxy from 'http-proxy-middleware';
import * as querystring from 'querystring';
import * as fetch from 'node-fetch';
const RedisStore = redisStore(session);
import * as redis from 'redis';
import { Auth } from './route/auth';
import { appConfig } from './app-config';
import { proxyConfig } from './proxy-config';
import { REFUSED } from 'dns';
import { runInNewContext } from 'vm';
import { Http2SecureServer } from 'http2';


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
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cors());

        let redisClient = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD   
        });
        
        redisClient.on("error", function (err) {
            console.log("Error " + err);
        });
        
        this.app.use(session({
            name: 'csgames-session',
            store: new RedisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
            cookie: { 
                // TODO: secure: true,
                httpOnly: true,
                domain: process.env.APP_URL,
                path: '/',
                expires: appConfig.cookieExpiration 
            }
        }));
        
        this.app.use(function(req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
            res.setHeader("X-XSS-Protection", "1; mode=block");
            res.setHeader("Content-security-policy", appConfig.contentSecurityPolicy);
            res.setHeader("X-frame-options", appConfig.xFrameOptions);
            res.setHeader("X-content-type", appConfig.xContentType);
            // TODO: res.setHeader("Strict-transport-security", appConfig.strictTransportSecurity);

            return next();
        });
        this.app.use(this.renewToken);
        
        this.app.disable('x-powered-by')
    }

    public routes() {
        const auth: Auth = new Auth();
       
        
        this.app.use(httpProxy(proxyConfig.path, { 
            target: proxyConfig.target, 
            router: proxyConfig.router,
            logLevel: proxyConfig.logLevel,
            // TODO: secure: true,
            // TODO: changeOrigin: true,
            onProxyReq: this.onRequest
         }));
        
        this.app.use(process.env.GATEWAY_BASE_PATH, auth.router);
        
        /*
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error('Not Found');
            next(err);
        });*/

        /*
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 404);
            res.send({
                message: err.message,
                error: {}
            });
        });*/
        
    }

    private async renewToken(req: express.Request, res: express.Response, next) {
        console.log("on before request");
        if(req.session && req.session.access_token){
            let now = new Date().getTime() / 1000;
            
            if (/*now >= req.session.access_token_expiration*/true) {
                if (req.session.refresh_token) {
                    let body = querystring.stringify({
                        client_id: process.env.STS_CLIENT_ID,
                        client_secret: process.env.STS_CLIENT_SECRET,
                        scope: process.env.STS_CLIENT_SCOPES,
                        refresh_token: req.session.refresh_token,
                        grant_type: 'refresh_token'
                    });
            
                    try {
                        let response = await fetch(`${process.env.STS_URL}/connect/token`, {
                            method: 'POST',
                            body: body,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(r => { 
                            console.log(r);
                            if (r.status === 200) {
                                return r.json();
                            }
                            console.log("response type not 200");
                            return null;
                        });
                        
                        if (response){
                            console.log("response, on peut set la session --> " + response);
                            req.session.access_token = response.access_token;
                            req.session.refresh_token = response.refresh_token;
                            console.log("les tokens sont set");
                        } else {
                            console.log("no response");
                            req.session.destroy(err => console.log(err));
                        }                    
                    } catch (e) {
                        console.log("Exception lors du renouvellement du token: " + e);
                        req.session.destroy(err => console.log(err));
                    }
                    console.log("notre session est toujours valide? " + req.sessionID);
                    if (req.session && req.session.access_token) {
                        console.log("la session est toujours existante");
                        let payload = JSON.parse(Buffer.from(req.session.access_token.split('.')[1], 'base64').toString());
                        req.session.access_token_expiration = payload.exp;
                        console.log(req.session.access_token_expiration);
                    } else {
                        // probleme au renouvellement de la session, likely refresh token invvalide, must login
                        console.log("Session invalide apres renouvellement");
                        res.send(401);
                        //proxyReq.abort(); // this line drops the request that otherwise still reaches 
                        return;
                    }                
                } else {
                    // drop session invalide must login
                    console.log("REFRESH TOKEN INVALIDE");
                    res.send(401);
                    //proxyReq.abort(); // this line drops the request that otherwise still reaches 
                    return;
                }
            }
        }
        console.log("on before request done");
        next();
    }

    private onRequest(proxyReq: http.ClientRequest, req: express.Request, res: express.Response) {
        console.log("on set les headers");
        proxyReq.setHeader("Authorization", `Bearer ${req.session.access_token}`);
        proxyReq.removeHeader("Cookie");
        console.log("les headers sont set");
    }
}
