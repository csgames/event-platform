import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class WebHookGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (!req.body.timestamp || !req.body.signature) {
            return false;
        }

        const hexDigest = crypto
            .createHmac("sha256", process.env.MAILGUN_API_KEY)
            .update(req.body.timestamp + req.body.token)
            .digest("hex");

        return hexDigest === req.body.signature;
    }
}
