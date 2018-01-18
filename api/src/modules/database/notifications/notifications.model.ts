import * as mongoose from "mongoose";
import { Attendees } from "../attendees/attendees.model";

export interface Notifications extends mongoose.Document {
    text: string;
    date: Date;
    attendees: (Attendees | mongoose.Types.ObjectId | string)[];
}

export const NotificationsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'attendees'
    },
});
