import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";

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
