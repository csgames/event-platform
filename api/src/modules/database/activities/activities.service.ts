import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateActivityDto } from "./activities.dto";
import { Activities } from "./activities.model";
import { BaseService } from "../../../services/base.service";

@Component()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@Inject("ActivitiesModelToken") private readonly attendeesModel: Model<Activities>) {
        super(attendeesModel);
    }
}
