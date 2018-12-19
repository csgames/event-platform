import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";

export interface Activities extends mongoose.Document {
    readonly name: string;
    readonly beginDate: Date | string;
    readonly endDate: Date | string;
    readonly details: object;
    readonly location: string;
    readonly attendees: (Attendees | mongoose.Types.ObjectId | string)[];
}

export const ActivitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
});
