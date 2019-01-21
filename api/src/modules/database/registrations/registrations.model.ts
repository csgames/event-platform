import * as mongoose from "mongoose";
import { Events } from '../events/events.model';
import * as uuid from 'uuid';

export interface RegistrationsModel extends mongoose.Document {
    uuid: string;
    event: (Events | mongoose.Types.ObjectId | string);
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
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'event'
    },
    used: {
        type: Boolean,
        default: false
    }
});
