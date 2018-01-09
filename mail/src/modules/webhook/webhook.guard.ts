import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import * as crypto from "crypto";

@Guard()
export class WebHookGuard implements CanActivate {
    canActivate(req, context: ExecutionContext): boolean {
        if (!req.body.timestamp || !req.body.signature) {
            return false;
        }

        let hexDigest = crypto
            .createHmac("sha256", process.env.MAILGUN_API_KEY)
            .update(req.body.timestamp + req.body.token)
            .digest("hex");

        return hexDigest === req.body.signature;
    }
}
