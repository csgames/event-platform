import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";
import { Events } from "../events/events.model";
import { Schools } from "../schools/schools.model";

export interface Teams extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
    event: Events | mongoose.Types.ObjectId | string;
    school: Schools | mongoose.Types.ObjectId | string;
    present: boolean;
    maxMembersNumber: number;
}

export const TeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'attendees'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'events'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    },
    maxMembersNumber: {
        type: Number,
        required: true
    }
});
