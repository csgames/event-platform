import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { IRequest } from "../../../models/i-request";
import { CreateRegistrationDto } from "./registrations.dto";

@Injectable()
export class CreateRegistrationGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<IRequest>();
        const body = req.body as CreateRegistrationDto;
        const role = req.role;

        if (body.role === "captain" && role === "captain") {
            throw new ForbiddenException();
        }

        return true;
    }
}
