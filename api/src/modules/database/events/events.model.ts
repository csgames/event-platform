import * as mongoose from "mongoose";
import { Activities } from "../activities/activities.model";
import { Attendees } from "../attendees/attendees.model";

export interface EventRegistrations extends mongoose.Document {
    attendee: (Attendees | mongoose.Types.ObjectId | string);
    selected: boolean;
    confirmed: boolean;
    declined: boolean;
}

export const EventRegistrationsSchema = new mongoose.Schema({
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendees'
    },
    selected: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    declined: {
        type: Boolean,
        default: false
    }
});

export interface Events extends mongoose.Document {
    readonly name: string;
    readonly beginDate: Date;
    readonly endDate: Date;
    readonly activities: (Activities | mongoose.Types.ObjectId | string)[];
    readonly attendees: EventRegistrations[];
    readonly imageUrl: string;
    readonly coverUrl: string;
    readonly website: string;
}

export const EventsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
    attendees: [EventRegistrationsSchema],
    imageUrl: {
        type: String
    },
    coverUrl: {
        type: String
    },
    website: {
        type: String
    }
});
