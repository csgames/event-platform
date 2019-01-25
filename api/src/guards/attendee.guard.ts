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

        const event = await this.eventService.findById(req.params.eventId);
        if (!event) {
            throw new NotFoundException('No event found');
        }

        const email = req.header('token-claim-name');
        const attendee = await this.attendeeService.findOne({
            email
        });
        if (!attendee) {
            throw new NotFoundException('No attendee found');
        }

        const eventAttendee = event.attendees
            .find(x => (x.attendee as mongoose.Types.ObjectId).toHexString() === attendee._id.toHexString());
        if (!eventAttendee) {
            throw new BadRequestException('Attendee not registered in event');
        }

        req.event = event;
        req.attendee = attendee;
        req.role = eventAttendee.role;

        const permissions = await this.redisService.get(`${email}:event:${event._id}`);
        if (!permissions) {
            const rolePermissions = await this.getPermissionFromRole(eventAttendee.role);
            req.permissions = rolePermissions;
            await this.redisService.set(`${email}:event:${event._id}`, JSON.stringify(rolePermissions));
        } else {
            req.permissions = JSON.parse(permissions);
        }

        return true;
    }

    private async getPermissionFromRole(name: string): Promise<string[]> {
        const role = (await this.stsService.getRolesByName(name)).role;
        return role.permissions;
    }
}
