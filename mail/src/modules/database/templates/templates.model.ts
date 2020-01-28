import * as mongoose from "mongoose";

export const templateVariableTypes = ["string", "number", "date"];
export type TemplateVariableTypes = "string" | "number" | "date";

export interface TemplateVariables extends mongoose.Document {
    name: string;
    type: TemplateVariableTypes;
}

export interface Template extends mongoose.Document {
    name: string;
    description: string;
    html: string;
    variables: TemplateVariables[];
}

export const TemplateVariablesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: templateVariableTypes
    }
});

export const TemplatesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    html: {
        type: String,
        required: true
    },
    description: String,
    variables: [TemplateVariablesSchema]
});
