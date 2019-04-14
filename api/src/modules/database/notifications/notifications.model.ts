import * as mongoose from "mongoose";
import { Events } from "../events/events.model";

export interface Notifications extends mongoose.Document {
    title: string;
    body: string;
    timestamp: Date;
    event: (Events | mongoose.Types.ObjectId | string);
    tokens: string[];
    data: {
        [key: string]: string
    };
}

export const NotificationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tokens: {
        type: [String],
        required: false
    },
    data: {
        type: Object,
        required: false
    }
});
