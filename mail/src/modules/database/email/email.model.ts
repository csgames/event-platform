import * as mongoose from "mongoose";

export interface Email extends mongoose.Document {
    mailgunId: string;
    timestamp: Date;
    from: string;
    to: { [key: string]: "delivered" | "dropped" | "queued"};
    subject: string;
    text: string;
    html: string;
    template: string;
    variables: { [key: string]: string };
}

export const EmailSchema = new mongoose.Schema({
    mailgunId: {
        type: String,
        unique: true,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: { },
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: false
    },
    template: {
        type: String,
        required: false,
    },
    variables: {
        type: Object,
        required: false
    }
});
