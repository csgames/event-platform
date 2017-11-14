import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";

export interface Activities extends mongoose.Document {
    readonly name: string;
    readonly beginDate: Date;
    readonly endDate: Date;
    readonly location: string;
    readonly attendees: (Attendees[] | mongoose.Types.ObjectId | string)[];
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
    location: {
        type: String,
        required: true
    },
    attendees: {
        type: [mongoose.Types.ObjectId],
        ref: 'attendees'
    }
});
