import * as mongoose from 'mongoose';
import { Activities } from '../activities/activities.model';
import { Attendees } from '../attendees/attendees.model';
import { Sponsors } from '../sponsors/sponsors.model';

export const EVENT_TYPE_LH_GAMES = 'lhgames';
export const EVENT_TYPE_MLH = 'mlh';

export interface EventRegistrations extends mongoose.Document {
    attendee: (Attendees | mongoose.Types.ObjectId | string);
    selected: boolean;
    confirmed: boolean;
    declined: boolean;
    present: boolean;
    scannedAttendees: (Attendees | mongoose.Types.ObjectId | string)[];
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
    },
    present: {
        type: Boolean,
        default: false
    },
    scannedAttendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees'
    },
});

export interface EventSponsors {
    tier: string;
    sponsor: Sponsors | mongoose.Types.ObjectId | string;
}

export const EventSponsorsSchema = new mongoose.Schema({
    tier: {
        type: String,
        required: true
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponsors',
        required: true
    }
});

export interface Events extends mongoose.Document {
    readonly type: string;
    readonly name: string;
    readonly details: object;
    readonly beginDate: Date | string;
    readonly endDate: Date | string;
    readonly activities: (Activities | mongoose.Types.ObjectId | string)[];
    readonly attendees: EventRegistrations[];
    readonly sponsors: EventSponsors[];
    readonly imageUrl: string;
    readonly coverUrl: string;
    readonly website: string;
    readonly facebookEvent: string;
    readonly locationName: string;
    readonly locationAddress: string;
    readonly maxTeamMembers: number;
}

export const EventsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [EVENT_TYPE_LH_GAMES, EVENT_TYPE_MLH]
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    details: {
        type: Object,
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
    },
    facebookEvent: {
        type: String
    },
    locationName: {
        type: String
    },
    locationAddress: {
        type: String
    },
    maxTeamMembers: {
        type: Number,
        default: 4
    },
    sponsors: [EventSponsorsSchema]
});
