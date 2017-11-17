import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateEventDto } from "./events.dto";
import { Events } from "./events.model";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";

@Component()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@Inject("EventsModelToken") private readonly eventsModel: Model<Events>,
                private attendeeService: AttendeesService) {
        super(eventsModel);
    }

    async addAttendee(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({ userId });
        return this.eventsModel.update({ _id: eventId }, { $push: { attendees: attendee._id }}).exec();
    }
}
