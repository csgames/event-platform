import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { Attendees } from '../attendees/attendees.model';
import { EventsService } from '../events/events.service';
import { RegistrationsService } from '../registrations/registrations.service';
import { CreateDirectorDto } from './competitions.dto';
import { Competitions } from './competitions.model';

@Injectable()
export class CompetitionsService extends BaseService<Competitions, Competitions> {
    constructor(@InjectModel('competitions') private readonly competitionsModel: Model<Competitions>,
                @InjectModel('attendees') private readonly attendeesModel: Model<Attendees>,
                private readonly registrationService: RegistrationsService,
                private readonly eventsService: EventsService) {
        super(competitionsModel);
    }

    public async createDirector(eventId: string, competitionId: string, dto: CreateDirectorDto): Promise<Attendees> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.registrationService.registerUser(dto, eventId, 'director');

        competition.directors.push(attendee._id);
        await competition.save();

        return attendee;
    }

    public async addDirector(eventId: string, competitionId: string, attendeeId: string): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            _id: attendeeId
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        const role = await this.eventsService.getAttendeeRole(eventId, attendeeId);
        if (role && role !== "director") {
            throw new BadRequestException("Attendee must be a director");
        }

        if (!role) {
            await this.eventsService.addAttendee(eventId, attendee, 'director');
        }

        if (competition.directors.findIndex(x => (x as mongoose.Types.ObjectId).equals(attendeeId)) >= 0) {
            throw new BadRequestException("Attendee is already a director for this competition");
        }

        await this.competitionsModel.updateOne({
            _id: competitionId
        }, {
            $push: {
                directors: attendeeId
            }
        }).exec();
    }

    public async removeDirector(eventId: string, competitionId: string, attendeeId: string): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            _id: attendeeId
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        if (competition.directors.findIndex(x => (x as mongoose.Types.ObjectId).equals(attendeeId)) < 0) {
            throw new BadRequestException("Attendee isn't a director for this competition");
        }

        await this.competitionsModel.updateOne({
            _id: competitionId
        }, {
            $pull: {
                directors: attendeeId
            }
        }).exec();
    }
}
