import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { STSService } from '@polyhx/nest-services';
import * as mongoose from 'mongoose';
import { IRequest } from '../models/i-request';
import { CacheService } from '../modules/cache/cache.service';
import { AttendeesService } from '../modules/database/attendees/attendees.service';
import { EventsService } from '../modules/database/events/events.service';

@Injectable()
export class AttendeeGuard implements CanActivate {
    constructor(private attendeeService: AttendeesService, private eventService: EventsService,
                private cacheService: CacheService, private stsService: STSService) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<IRequest>();

        const email = req.header('token-claim-name');
        const eventId = req.header('eventId');
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
        const role = (await this.stsService.getRolesByName(name)).role;
        return role.permissions;
    }
}
