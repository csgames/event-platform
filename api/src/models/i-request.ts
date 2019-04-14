import * as express from "express";

export interface IRequest extends express.Request {
    eventId: string;
    role: string;
    permissions: string[];
}
