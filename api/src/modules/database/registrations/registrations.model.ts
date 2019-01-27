import * as mongoose from "mongoose";
import { Events } from '../events/events.model';
import * as uuid from 'uuid';
import { Attendees } from '../attendees/attendees.model';

export interface Registrations extends mongoose.Document {
    uuid: string;
    attendee: (Attendees | mongoose.Types.ObjectId | string);
    role: string;
    used: boolean;
}

export const RegistrationsSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return uuid.v4();
        }
    },
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'attendee'
    },
    role: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    }
});
