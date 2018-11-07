import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../../services/base.service';
import { Sponsors } from './sponsors.model';
import { CreateSponsorDto } from './sponsors.dto';
import { Model } from "mongoose";

@Injectable()
export class SponsorsService extends BaseService<Sponsors, CreateSponsorDto> {
    constructor(@InjectModel("sponsors") private readonly sponsorsModel: Model<Sponsors>) {
        super(sponsorsModel);
    }
}
