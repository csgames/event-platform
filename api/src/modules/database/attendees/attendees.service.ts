import { InjectModel } from "@nestjs/mongoose";
import { DocumentQuery, Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { Attendees } from "./attendees.model";
import { BaseService } from "../../../services/base.service";
import { CreateAttendeeDto } from "./attendees.dto";
import { DataTableInterface, DataTableReturnInterface } from "../../../interfaces/dataTable.interface";
import { Schools } from "../schools/schools.model";
import { SchoolsService } from "../schools/schools.service";
import { STSService } from "@polyhx/nest-services";

interface AttendeeDtInterface extends Attendees {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}

@Injectable()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    constructor(@InjectModel("attendees") private readonly attendeesModel: Model<Attendees>,
                private readonly schoolService: SchoolsService,
                private readonly stsService: STSService) {
        super(attendeesModel);
    }

    private async getFilteredUserIds(filter: DataTableInterface) {
        let users = (await this.stsService.queryAll(filter.search.value)).users;
        return users.map(v => v.id);
    }

    private async getFilteredSchoolIds(filter: DataTableInterface) {
        let regex = filter.search.regex ? filter.search.value : `.*${filter.search.value}.*`;
        let schools = await this.schoolService.find({
            $or: [{
                name: {
                    $regex: regex
                }
            }, {
                website: {
                    $regex: regex
                }
            }]
        });
        return schools.map(v => v._id);
    }

    private async getAttendeesUser(attendees: AttendeeDtInterface[]) {
        let ids = attendees.map(v => v.userId);
        let users = (await this.stsService.getAllWithIds(ids)).users;

        for (let attendee of attendees) {
            let user = users[users.findIndex(value => (<any>value).id === attendee.userId)];
            if (user) {
                attendee.firstName = user.firstName;
                attendee.lastName = user.lastName;
                attendee.email = user.username;
                attendee.birthDate = user.birthDate;
            } else {
                attendee.firstName = attendee.firstName = attendee.email = attendee.birthDate = "";
            }
        }
    }

    public async filterFrom(attendeeIds: string[], dtObject: DataTableInterface,
                            filter: { school: string[] }): Promise<DataTableReturnInterface> {
        let query: DocumentQuery<Attendees[], Attendees, {}>;
        if (filter.school.length > 0) {
            query = this.attendeesModel.find({
                $and: [{
                    _id: { $in: attendeeIds }
                }, {
                    school: { $in: filter.school }
                }]
            });
        } else {
            query = this.attendeesModel.find({
                $and: [{
                    _id: { $in: attendeeIds }
                }]
            });
        }

        let data: DataTableReturnInterface = <DataTableReturnInterface> {
            draw: dtObject.draw,
            recordsTotal: await query.countDocuments().exec()
        };

        let attendees = await query.find()
            .populate({ path: 'school' })
            .limit(dtObject.length)
            .skip(dtObject.start)
            .exec();

        let result = attendees.map(v => {
            let a: Partial<AttendeeDtInterface> = v.toJSON();
            a.school = v.school ? (<Schools>v.school).name : "";

            return <AttendeeDtInterface>a;
        });

        if (result.length > 0) {
            await this.getAttendeesUser(result);
        }

        data.data = result;
        data.recordsFiltered = data.recordsTotal;

        return data;
    }

    public async addToken(userId: string, token: string) {
        return this.attendeesModel.updateOne({
            userId: userId
        }, {
            $push: {
                messagingTokens: token
            }
        });
    }

    public async removeToken(userId: string, token: string) {
        return this.attendeesModel.updateOne({
            userId: userId
        }, {
            $pull: {
                messagingTokens: token
            }
        });
    }
}
