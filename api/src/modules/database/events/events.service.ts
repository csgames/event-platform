import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateEventDto } from "./events.dto";
import { Events } from "./events.model";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { Code } from "./events.exception";

@Component()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@Inject("EventsModelToken") private readonly eventsModel: Model<Events>,
                private attendeeService: AttendeesService) {
        super(eventsModel);
    }

    async addAttendee(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        const attendeeAlreadyRegistered = (await this.eventsModel.count({
            _id: eventId,
            "attendees.attendee": attendee._id
        }).exec()) > 0;

        if (attendeeAlreadyRegistered) {
            throw new CodeException(Code.ATTENDEE_ALREADY_REGISTERED);
        }

        return this.eventsModel.update({
            _id: eventId
        }, {
            $push: {
                attendees: {
                    attendee: attendee._id
                }
            }
        }).exec();
    }

    async hasAttendeeForUser(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return this.hasAttendee(eventId, attendee._id);
    }

    async hasAttendee(eventId: string, attendeeId: string) {
        const occurrencesOfAttendee = await this.eventsModel.count({
            _id: eventId,
            "attendees.attendee": attendeeId
        }).exec();

        return occurrencesOfAttendee > 0;
    }

    async getAttendeeStatus(attendeeId: string, eventId: string) {
        const event = await this.findOne({_id: eventId});
        const status = event.attendees.find(a => a.attendee.toString() === attendeeId.toString());
        if (!status) {
            return 'not-registered';
        }
        if (status.confirmed) {
            return 'confirmed';
        } else if (status.selected) {
            return 'selected';
        } else {
            return 'registered';
        }
    }
}
