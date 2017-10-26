import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";

@Component()
export class AttendeesService {
    constructor(@Inject("AttendeesModelToken") private readonly attendeesModel: Model<Attendees>) {
    }

    async create(createAttendeeDto: CreateAttendeeDto): Promise<Attendees> {
        const createdAttendee = new this.attendeesModel(createAttendeeDto);
        return await createdAttendee.save();
    }

    async findAll(): Promise<Attendees[]> {
        return await this.attendeesModel.find().exec();
    }
}
