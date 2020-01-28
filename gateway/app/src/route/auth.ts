import * as bodyParser from "body-parser";
import * as express from "express";
import * as fetch from "node-fetch";
import * as querystring from "querystring";

export class Auth {
    public router = express.Router();

    constructor() {
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.post("/login", this.login.bind(this));
        this.router.get("/logout", this.logout.bind(this));
        this.router.get("/isloggedin", this.isLoggedIn.bind(this));
    }

    // POST /login
    // email: the user's email
    // password: the user's password
    // remember: true or false, if the user wants to be remembered, for the remember me feature
    private async login(req: express.Request, res: express.Response) {
        const email = req.body.email;
        const password = req.body.password;
        const rememberMe = req.body.remember;

        if (!email || !password || email === "" || password === "") {
            res.statusCode = 422;
            res.json({ error: "Email and password fields must not be empty." });
            return;
        }

        const body = querystring.stringify({
            client_id: process.env.STS_CLIENT_ID,
            client_secret: process.env.STS_CLIENT_SECRET,
            scope: process.env.STS_CLIENT_SCOPES,
            grant_type: "password",
            username: email,
            password: password
        });

        try {
            let response = await fetch(`${process.env.STS_URL}/connect/token`, {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(r => r.json());

            if (response.access_token) {
                req.session.access_token = response.access_token;
                let payload = JSON.parse(Buffer.from(response.access_token.split(".")[1], "base64").toString());
                req.session.access_token_expiration = payload.exp;

                if (rememberMe) {
                    req.session.refresh_token = response.refresh_token;
                }
                res.json({
                    success: true
                });
            } else {
                res.statusCode = 401;
                res.json({
                    success: false
                });
            }
        } catch (e) {
            res.json({ error: "An error occured." });
            console.log(e);
            res.statusCode = 500;
            return;
        }
    }

    // GET /logout
    private async logout(req: express.Request, res: express.Response) {
        if (req.session.refresh_token) {
            const body = querystring.stringify({
                client_id: process.env.STS_CLIENT_ID,
                client_secret: process.env.STS_CLIENT_SECRET,
                token: req.session.refresh_token
            });

            try {
                await fetch(`${process.env.STS_URL}/connect/revoke`, {
                    method: "POST",
                    body: body,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(r => r.json());
            } catch (e) {
                // Catch error
            }
        }

        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    res.json({ success: false });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            res.status(401).json({ success: false });
        }
    }

    //GET /isloggedin
    private isLoggedIn(req: express.Request, res: express.Response) {
        if (req.session.access_token) {
            res.json({
                logged_in: true
            });
        } else {
            res.json({
                logged_in: false
            });
        }
    }
}
