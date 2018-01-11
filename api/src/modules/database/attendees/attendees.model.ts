import * as mongoose from "mongoose";
import * as uuid from "uuid";
import { Schools } from "../schools/schools.model";
import { UserModel } from "../../sts/user.model";

export interface Attendees extends mongoose.Document {
    userId: string;
    github: string;
    linkedIn: string;
    cv: string;
    website: string;
    degree: string;
    gender: string;
    tshirt: string;
    phoneNumber: string;
    acceptSMSNotifications: boolean;
    hasDietaryRestrictions: boolean;
    dietaryRestrictions: string;
    school: Schools | mongoose.Types.ObjectId | string;
    publicId: string;
    user: UserModel;
}

export const AttendeesSchema = new mongoose.Schema({
    userId: {
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
    degree: {
        type: String,
        enum: ['cegep', 'bachelor', 'master', 'phd'],
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
    }
});
