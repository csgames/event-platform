import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";
import { Events } from "../events/events.model";

export interface Teams extends mongoose.Document {
    name: string;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
    event: Events | mongoose.Types.ObjectId | string;
}

export const TeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
});