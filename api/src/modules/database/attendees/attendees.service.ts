import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { Attendees } from "./attendees.model";
import { BaseService } from "../../../services/base.service";
import { CreateAttendeeDto } from "./attendees.dto";

@Component()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    constructor( @Inject("AttendeesModelToken") private readonly attendeesModel: Model<Attendees>) {
        super(attendeesModel);
    }

    async create(object: Partial<Attendees>): Promise<Attendees> {
        await this.attendeesModel.update({ userId: object.userId }, <Object>object, { upsert: true }).exec();
        return this.findOne({ userId: object.userId }, { path: 'schools' });
    }
}
