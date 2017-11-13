import * as mongoose from "mongoose";
import { Attendees, AttendeesSchema } from "../attendees/attendees.model";
import { Events } from "../events/events.model";

export interface Teams extends mongoose.Document {
    readonly name: string;
    readonly attendees: Attendees[] | mongoose.Schema.Types.ObjectId[];
    readonly event: Events | mongoose.Schema.Types.ObjectId;
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
});
