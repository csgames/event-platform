import * as mongoose from "mongoose";

export interface PasswordResets extends mongoose.Document {
    userId: string;
    uuid: string;
    used: boolean;
}

export const PasswordResetsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    used: {
        type: Boolean
    }
});
