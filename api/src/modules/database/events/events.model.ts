import * as mongoose from "mongoose";
import { Activities } from "../activities/activities.model";
import { Attendees } from "../attendees/attendees.model";

export interface Events extends mongoose.Document {
    readonly name: string;
    readonly beginDate: Date;
    readonly endDate: Date;
    readonly activities: Activities[] | mongoose.Schema.Types.ObjectId[];
    readonly attendees: Attendees[] | mongoose.Schema.Types.ObjectId[];
}

export const EventsSchema = new mongoose.Schema({
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
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'activities'
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees'
    }
});
