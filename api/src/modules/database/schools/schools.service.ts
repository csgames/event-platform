import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { Schools } from "./schools.model";
import { BaseService } from "../../../services/base.service";
import { CreateSchoolDto } from "./schools.dto";

@Component()
export class SchoolsService extends BaseService<Schools, CreateSchoolDto> {
    constructor(@Inject("SchoolsModelToken") private readonly schoolsModel: Model<Schools>) {
        super(schoolsModel);
    }
}
