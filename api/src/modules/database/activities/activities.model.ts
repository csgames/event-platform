import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";
import { DateUtils } from '../../../utils/date.utils';
import { PuzzleHeroes } from '../puzzle-heroes/puzzle-heroes.model';

export const ActivityTypes = [
    'food',
    'competition',
    'other'
];

export interface Activities extends mongoose.Document {
    readonly name: { [lang: string]: string };
    readonly type: string;
    readonly beginDate: Date | string;
    readonly endDate: Date | string;
    readonly details: { [lang: string]: string };
    readonly location: string;
    readonly attendees: (Attendees | mongoose.Types.ObjectId | string)[];
    readonly subscribers: (Attendees | mongoose.Types.ObjectId | string)[];
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
        let start: Date;
        let end: Date;
        if (activities instanceof Array) {
            start = activities.sort((a, b) => a.beginDate > b.beginDate ? 1 : -1)[0].beginDate as Date;
            end = activities.sort((a, b) => a.endDate > b.endDate ? -1 : 1)[0].endDate as Date;
        } else {
            start = activities.beginDate as Date;
            end = activities.endDate as Date;
        }

        const now = DateUtils.nowUTC();
        return now >= start && now <= end;
    }
}
