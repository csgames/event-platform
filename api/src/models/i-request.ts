import * as express from 'express';
import { Events } from '../modules/database/events/events.model';
import { Attendees } from '../modules/database/attendees/attendees.model';

export interface IRequest extends express.Request {
    eventId: string;
    role: string;
    permissions: string[];
}
