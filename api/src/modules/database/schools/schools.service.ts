import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../../../services/base.service";
import { CreateSchoolDto } from "./schools.dto";
import { Schools } from "./schools.model";

@Injectable()
export class SchoolsService extends BaseService<Schools, CreateSchoolDto> {
    constructor(@InjectModel("schools") private readonly schoolsModel: Model<Schools>) {
        super(schoolsModel);
    }

    public async query(searchQuery: string): Promise<Schools[]> {
        let tokens = searchQuery
            .split(' ')
            .map(t => {
                return {
                    $or: [
                        {
                            name: {
                                $regex: `.*${t}.*`,
                                $options:
                                    'i'
                            }
                        },
                        {
                            website: {
                                $regex: `.*${t}.*`,
                                $options:
                                    'i'
                            }
                        }
                    ]
                };
            });
        return this.schoolsModel
            .find({
                $and: tokens
            });
    }
}
