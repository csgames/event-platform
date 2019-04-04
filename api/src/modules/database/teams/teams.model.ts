import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";
import { Events } from "../events/events.model";
import { Schools } from "../schools/schools.model";
import { Sponsors } from '../sponsors/sponsors.model';

export interface Teams extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
    event: Events | mongoose.Types.ObjectId | string;
    school: Schools | mongoose.Types.ObjectId | string;
    sponsor: Sponsors | mongoose.Types.ObjectId | string;
    present: boolean;
    maxMembersNumber: number;
    showOnScoreboard: boolean;
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
        ref: 'schools'
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponsors'
    },
    maxMembersNumber: {
        type: Number,
        required: true
    },
    showOnScoreboard: {
        type: Boolean,
        required: true
    }
});
