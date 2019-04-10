import * as mongoose from 'mongoose';
import { Activities } from '../activities/activities.model';
import { Attendees } from '../attendees/attendees.model';
import { Sponsors } from '../sponsors/sponsors.model';
import { DateUtils } from '../../../utils/date.utils';

export enum EventAttendeeTypes {
    Admin = 'admin',
    Attendee = 'attendee',
    Captain = 'captain',
    Director = 'director',
    GodParent = 'godparent',
    Sponsor = 'sponsor',
    Volunteer = 'volunteer'
}

export interface EventSponsorDetails extends Sponsors {
    padding: number[];
    widthFactor: number;
    heightFactor: number;
}

export interface EventAttendees extends mongoose.Document {
    attendee: (Attendees | mongoose.Types.ObjectId | string);
    role: EventAttendeeTypes;
    scannedAttendees: (Attendees | mongoose.Types.ObjectId | string)[];
    registered: boolean;
}

export const EventRegistrationsSchema = new mongoose.Schema({
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendees'
    },
    role: {
        type: String,
        enum: ['admin', 'attendee', 'captain', 'director', 'godparent', 'sponsor', 'volunteer'],
        default: 'attendee'
    },
    scannedAttendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees'
    },
    registered: {
        type: Boolean,
        required: true,
        default: false
    }
});

export interface EventSponsors extends mongoose.Document {
    tier: string;
    sponsor: Sponsors | mongoose.Types.ObjectId | string;
    web: EventSponsorDetails;
    mobile: EventSponsorDetails;
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
    },
    web: {
        type: Object,
        required: false
    },
    mobile: {
        type: Object,
        required: false
    }
});

export interface EventGuide {
    bring: { [key: string]: string[] };
    school: {
        latitude: number,
        longitude: number,
        zoom: number,
        address: string,
        name: string,
        maps: [string],
        website: { [lang: string]: string }
    };
    hotel: {
        latitude: number,
        longitude: number,
        zoom: number,
        address: string,
        name: string
    };
    parkings: {
        latitude: number,
        longitude: number,
        zoom: number,
        coordinates: [{
            latitude: number,
            longitude: number
        }]
    };
    restaurant: {
        latitude: number,
        longitude: number,
        zoom: number,
        coordinates: [{
            info: string
            latitude: number,
            longitude: number
        }]
    };
    transport: {
        info: { [lang: string]: string },
        image: string,
        school: string,
        hotel: string,
        schoolLatitude: number,
        schoolLongitude: number,
        hotelLatitude: number,
        hotelLongitude: number
    };
}

export interface Events extends mongoose.Document {
    readonly name: string;
    readonly details: object;
    readonly beginDate: Date | string;
    readonly endDate: Date | string;
    readonly flashoutBeginDate: Date | string;
    readonly flashoutEndDate: Date | string;
    readonly activities: (Activities | mongoose.Types.ObjectId | string)[];
    readonly attendees: EventAttendees[];
    readonly sponsors: EventSponsors[];
    readonly imageUrl: string;
    readonly coverUrl: string;
    readonly website: string;
    readonly facebookEvent: string;
    readonly locationName: string;
    readonly locationAddress: string;
    readonly maxTeamMembers: number;
    readonly guide: EventGuide;
    readonly teamEditLocked: boolean;
    readonly teamEditLockDate: Date | string;
    readonly primaryColor: string;
}

export const EventsSchema = new mongoose.Schema({
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
    flashoutBeginDate: {
        type: Date,
        required: true
    },
    flashoutEndDate: {
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
    guide: {
        type: Object,
        required: false
    },
    sponsors: [EventSponsorsSchema],
    teamEditLocked: {
        type: Boolean,
        default: true
    },
    teamEditLockDate: {
        type: Date,
        required: true
    },
    primaryColor: {
        type: String,
        default: "#0d5899"
    }
});

export class EventsUtils {
    public static isFlashoutAvailable(event: Events) {
        const now = DateUtils.nowUTC();
        return now > event.flashoutBeginDate && now < event.flashoutEndDate;
    }
}
