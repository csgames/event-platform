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
        let attendee = await this.attendeeService.findOne({ userId });

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        if (await this.eventsModel.count({ _id: eventId, attendees: { $in: [attendee._id] } }).exec()) {
            throw new CodeException(Code.ATTENDEE_ALREADY_REGISTERED);
        }

        return this.eventsModel.update({ _id: eventId }, { $push: { attendees: attendee._id }}).exec();
    }

    async hasAttendee(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({ userId });

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return (await this.eventsModel.count({ _id: eventId, attendees: { $in: [attendee._id] } }).exec()) > 0;
    }
}
