import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { Attendees } from "./attendees.model";
import { BaseService } from "../../../services/base.service";
import { CreateAttendeeDto } from "./attendees.dto";
import { async } from "rxjs/scheduler/async";

@Component()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    constructor( @Inject("AttendeesModelToken") private readonly attendeesModel: Model<Attendees>) {
        super(attendeesModel);
    }

    async create(object: Partial<Attendees>): Promise<Attendees> {
        if (await this.attendeesModel.count({ userId: object.userId })) {
            return this.attendeesModel.update({ userId: object.userId }, <Object>object).exec()
                .then(async r => {
                    return await this.findOne({ userId: object.userId }, { path: 'school' });
                });
        } else {
            return this.attendeesModel.create(<Object>object).then(async r => {
                return await this.findOne({ userId: object.userId }, { path: 'school' });
            });
        }
    }
}
