import * as mongoose from 'mongoose';

export interface Sponsors extends mongoose.Document {
    name: string;
    description: { [language: string]: object };
    website: string;
    imageUrl: string;
    padding: number[];
    widthFactor: number;
    heightFactor: number;
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
    },
    padding: {
        type: Array,
        required: false
    },
    widthFactor: {
        type: Number,
        required: false
    },
    heightFactor: {
        type: Number,
        required: false
    }
});
