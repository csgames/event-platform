import * as express from 'express';
import * as fetch from 'node-fetch';
import { isNullOrUndefined } from 'util';
import { appConfig } from '../app-config';
import * as querystring from 'querystring';

export class Auth {
    public router = express.Router();

    constructor() {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
    }
    
    // POST /login
    private async login(req: express.Request, res: express.Response) {
        let email = req.body.email;
        let password = req.body.password;
        let biscuit = req.session.cookie;
    
        if(isNullOrUndefined(email) || isNullOrUndefined(password) 
            || email === "" || password === "") {
            res.json({ error: "Email and password fields must not be empty." });
            res.statusCode = 422;
            return;
        }

        let body = querystring.stringify({
            client_id: process.env.STS_CLIENT_ID,
            client_secret: process.env.STS_CLIENT_SECRET,
            scope: process.env.STS_CLIENT_SCOPES,
            grant_type: 'password',
            username: email,
            password: password
        });

        try {
            let response = await fetch(`${process.env.STS_URL}/connect/token`, {
                method: 'POST',
                body: body,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(r => r.json());
            
            if(response.access_token && response.refresh_token) {
                req.session.access_token = response.access_token;
                req.session.refresh_token = response.refresh_token;
                res.json({
                    Success: true
                });
            } else {
                res.statusCode = 401;
                res.json({
                    Success: false
                });
            }            
        } catch (e) {
            res.json({ error: "An error occured." });
            console.log(e);
            res.statusCode = 500;
            return;
        }
    }


    // POST /register
    private register(req: express.Request, res: express.Response) {
        res.json({
            register: "register"
        });
    }
}
