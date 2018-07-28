import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateActivityDto } from "./activities.dto";
import { Activities } from "./activities.model";
import { BaseService } from "../../../services/base.service";

@Injectable()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@InjectModel("activities") private readonly attendeesModel: Model<Activities>) {
        super(attendeesModel);
    }
}
