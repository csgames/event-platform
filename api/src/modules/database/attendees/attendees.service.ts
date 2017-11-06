import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";
import { BaseService } from "../../../services/base.service";

@Component()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    constructor(@Inject("AttendeesModelToken") private readonly attendeesModel: Model<Attendees>) {
        super(attendeesModel);
    }
}
