import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataTableInterface, DataTableReturnInterface } from '../../../interfaces/dataTable.interface';
import { BaseService } from '../../../services/base.service';
import { CreateActivityDto } from './activities.dto';
import { Activities } from './activities.model';

@Injectable()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@InjectModel("activities") private readonly activityModel: Model<Activities>) {
        super(activityModel);
    }

    public async filterFrom(activitiesId: string[], filter: DataTableInterface): Promise<DataTableReturnInterface> {
        const condition = {
            $and: [{
                _id: { $in: activitiesId }
            }]
        };

        let query = this.activityModel.find(condition);
        let data: DataTableReturnInterface = <DataTableReturnInterface> {
            draw: filter.draw,
            recordsTotal: await query.count().exec()
        };

        let sort = filter.columns[filter.order[0].column].name;
        sort = (filter.order[0].dir === 'asc' ? '+' : '-') + sort;

        const activities = await query.find().sort(sort)
            .limit(filter.length)
            .skip(filter.start)
            .exec();

        data.data = activities;
        data.recordsFiltered = data.recordsTotal;

        return data;
    }
}
