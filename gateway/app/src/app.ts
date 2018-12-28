import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import { Auth } from './route/auth';
import { appConfig } from './app-config';

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
        
        
        this.app.use(session({
            name: 'csgames-session',
            resave: false,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
            cookie: { 
                //secure: true,
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
        this.app.use(cors());
        this.app.disable('x-powered-by')
    }

    public routes() {
        const auth: Auth = new Auth();
        this.app.use("/", auth.router);

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error('Not Found');
            next(err);
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 404);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}
