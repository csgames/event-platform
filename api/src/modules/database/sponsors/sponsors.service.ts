import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../../../services/base.service";
import { CreateSponsorDto } from "./sponsors.dto";
import { Sponsors } from "./sponsors.model";

@Injectable()
export class SponsorsService extends BaseService<Sponsors, CreateSponsorDto> {
    constructor(@InjectModel("sponsors") private readonly sponsorsModel: Model<Sponsors>) {
        super(sponsorsModel);
    }
}
