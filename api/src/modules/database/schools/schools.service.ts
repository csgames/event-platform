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
                }
            );
        return this.schoolsModel
            .find({
                $and: tokens
            });
    }
}
