import * as mongoose from 'mongoose';

export interface Sponsors extends mongoose.Document {
    name: string;
    description: { [language: string]: object };
    website: string;
    imageUrl: string;
}

export const SponsorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: Object,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
