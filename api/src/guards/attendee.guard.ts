import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { IRequest } from "../models/i-request";
import { Auth0Service } from "../modules/auth0/auth0.service";
import { CacheService } from "../modules/cache/cache.service";
import { AttendeesService } from "../modules/database/attendees/attendees.service";
import { EventsService } from "../modules/database/events/events.service";

@Injectable()
export class AttendeeGuard implements CanActivate {
    constructor(private attendeeService: AttendeesService, private eventService: EventsService,
                private cacheService: CacheService, private auth0Service: Auth0Service) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<IRequest>();

        const role = req.header("token-claim-https://api.csgames.org/role");
        const email = req.header("token-claim-https://api.csgames.org/username");
        const eventId = req.header("Event-Id");
        req.eventId = eventId;

        if (role === "super-admin") {
            req.role = role;
            req.permissions = req.header("token-claim-permissions") as unknown as string[];
            return true;
        }

        const cache = await this.cacheService.getUserCache(email, eventId);
        if (cache) {
            req.permissions = cache.permissions;
            req.role = cache.role;
            return true;
        }

        const event = await this.eventService.findById(eventId);
        if (!event) {
            req.permissions = [];
            return true;
        }

        const attendee = await this.attendeeService.findOne({
            email
        });
        if (!attendee) {
            req.permissions = [];
            return true;
        }

        const eventAttendee = event.attendees
            .find(x => (x.attendee as mongoose.Types.ObjectId).toHexString() === attendee._id.toHexString());
        if (!eventAttendee) {
            req.permissions = [];
            return true;
        }

        const rolePermissions = await this.getPermissionFromRole(eventAttendee.role);
        req.permissions = rolePermissions;
        req.role = eventAttendee.role;
        await this.cacheService.setUserCache(email, eventId, {
            permissions: rolePermissions,
            role: eventAttendee.role
        });

        return true;
    }

    private async getPermissionFromRole(name: string): Promise<string[]> {
        const roles = await this.auth0Service.roles.getAllRoles();
        const role = roles.find(x => x.name === name);
        if (!role) {
            return [];
        }
        return this.auth0Service.roles.getRolePermissions(role.id).then(permissions => permissions.map(x => x.permission_name));
    }
}
