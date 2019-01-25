import * as express from 'express';
import { Events } from '../modules/database/events/events.model';
import { Attendees } from '../modules/database/attendees/attendees.model';

export interface IRequest extends express.Request {
    event: Events;
    attendee: Attendees;
    role: string;
    permissions: string[];
}
