import * as mongoose from "mongoose";
import * as uuid from "uuid";
import { Schools } from "../schools/schools.model";
import { UserModel } from '@polyhx/nest-services';
import { Notifications } from '../notifications/notifications.model';

export interface AttendeeNotifications {
    notification: (Notifications | mongoose.Types.ObjectId | string);
    seen: boolean;
}

export const AttendeeNotificationSchema = new mongoose.Schema({
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'notifications'
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    }
});

export interface Attendees extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedIn: string;
    cv: string;
    website: string;
    gender: string;
    tshirt: string;
    phoneNumber: string;
    acceptSMSNotifications: boolean;
    hasDietaryRestrictions: boolean;
    dietaryRestrictions: string;
    school: Schools | mongoose.Types.ObjectId | string;
    publicId: string;
    user: UserModel;
    messagingTokens: string[];
    notifications: AttendeeNotifications[];
}

export const AttendeesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    github: {
        type: String,
        default: null
    },
    linkedIn: {
        type: String,
        default: null
    },
    cv: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'no_answer'],
        default: null
    },
    tshirt: {
        type: String,
        enum: ['small', 'medium', 'large', 'x-large', '2x-large'],
        default: null
    },
    phoneNumber: {
        type: String,
        default: null
    },
    acceptSMSNotifications: {
        type: Boolean,
        default: null
    },
    hasDietaryRestrictions: {
        type: Boolean,
        default: null
    },
    dietaryRestrictions: {
        type: String,
        default: null
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'schools'
    },
    publicId: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return uuid.v4();
        }
    },
    messagingTokens: {
        type: [String],
        default: []
    },
    notifications: [AttendeeNotificationSchema]
});
