import { Model } from "mongoose";
import { Component, Inject } from "@nestjs/common";
import { CreateTeamDto } from "./teams.dto";
import { Teams } from "./teams.model";
import { BaseService } from "../../../services/base.service";

@Component()
export class TeamsService extends BaseService<Teams, CreateTeamDto> {
    constructor(@Inject("TeamsModelToken") private readonly teamsModel: Model<Teams>) {
        super(teamsModel);
    }
}
