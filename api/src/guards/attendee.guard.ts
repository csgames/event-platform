import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { AttendeesService } from '../modules/database/attendees/attendees.service';
import { EventsService } from '../modules/database/events/events.service';
import * as mongoose from 'mongoose';
import { IRequest } from '../models/i-request';
import { RedisService } from '../modules/redis/redis.service';
import { STSService } from '@polyhx/nest-services';

@Injectable()
export class AttendeeGuard implements CanActivate {
    constructor(private attendeeService: AttendeesService, private eventService: EventsService,
                private redisService: RedisService, private stsService: STSService) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<IRequest>();

        const event = await this.eventService.findById(req.header('eventId'));
        if (!event) {
            req.permissions = [];
            return true;
        }
        req.event = event;

        const email = req.header('token-claim-name');
        const permissions = await this.redisService.get(`${email}:event:${event._id}:permissions`);
        const role = await this.redisService.get(`${email}:event:${event._id}:role`);
        if (permissions) {
            req.permissions = JSON.parse(permissions);
            req.role = role;
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
        await this.redisService.set(`${email}:event:${event._id}:permissions`, JSON.stringify(rolePermissions));
        await this.redisService.set(`${email}:event:${event._id}:role`, eventAttendee.role);

        return true;
    }

    private async getPermissionFromRole(name: string): Promise<string[]> {
        const role = (await this.stsService.getRolesByName(name)).role;
        return role.permissions;
    }
}
