import * as mongoose from 'mongoose';
import { Attendees } from '../attendees/attendees.model';
import { DateUtils } from '../../../utils/date.utils';

export const ActivityTypes = [
    'food',
    'competition',
    'other'
];

export interface Activities extends mongoose.Document {
    name: { [lang: string]: string };
    type: string;
    beginDate: Date | string;
    endDate: Date | string;
    details: { [lang: string]: string };
    location: string;
    hidden: boolean;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
    subscribers: (Attendees | mongoose.Types.ObjectId | string)[];
}

export const ActivitiesSchema = new mongoose.Schema({
    name: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ActivityTypes
    },
    beginDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees'
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees'
    }
});

export class ActivitiesUtils {
    public static isLive(activities: Activities | Activities[]): boolean {
        return ActivitiesUtils.isStarted(activities) && !ActivitiesUtils.isEnded(activities);
    }

    public static isEnded(activities: Activities | Activities[]): boolean {
        let end: Date;
        if (activities instanceof Array) {
            end = activities.sort((a, b) => a.endDate > b.endDate ? -1 : 1)[0].endDate as Date;
        } else {
            end = activities.endDate as Date;
        }

        const now = DateUtils.nowUTC();
        return now > end;
    }

    public static isStarted(activities: Activities | Activities[]): boolean {
        let start: Date;
        if (activities instanceof Array) {
            start = activities.sort((a, b) => a.beginDate > b.beginDate ? 1 : -1)[0].beginDate as Date;
        } else {
            start = activities.beginDate as Date;
        }

        const now = DateUtils.nowUTC();
        return now >= start;
    }
}
