import { Model } from "mongoose";
import { Component, HttpStatus, Inject } from "@nestjs/common";
import { CreateEventDto } from "./events.dto";
import { Events } from "./events.model";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { Code } from "./events.exception";
import { DataTableInterface, DataTableReturnInterface } from "../../../interfaces/dataTable.interface";
import { HttpException } from "@nestjs/core";
import { GetAllWithIdsResponse } from "@polyhx/nest-services/modules/sts/sts.service";
import { EmailService } from "../../email/email.service";
import { STSService } from "@polyhx/nest-services";
import { triggerAsyncId } from "async_hooks";

@Component()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@Inject("EventsModelToken") private readonly eventsModel: Model<Events>,
                private attendeeService: AttendeesService,
                private emailService: EmailService,
                private stsService: STSService) {
        super(eventsModel);
    }

    async addAttendee(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        const attendeeAlreadyRegistered = (await this.eventsModel.count({
            _id: eventId,
            "attendees.attendee": attendee._id
        }).exec()) > 0;

        if (attendeeAlreadyRegistered) {
            throw new CodeException(Code.ATTENDEE_ALREADY_REGISTERED);
        }

        return this.eventsModel.update({
            _id: eventId
        }, {
            $push: {
                attendees: {
                    attendee: attendee._id
                }
            }
        }).exec();
    }

    async hasAttendeeForUser(eventId: string, userId: string) {
        let attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return this.hasAttendee(eventId, attendee._id);
    }

    async hasAttendee(eventId: string, attendeeId: string) {
        const occurrencesOfAttendee = await this.eventsModel.count({
            _id: eventId,
            "attendees.attendee": attendeeId
        }).exec();

        return occurrencesOfAttendee > 0;
    }

    async getAttendeeStatus(attendeeId: string, eventId: string) {
        const event = await this.findOne({_id: eventId});
        const status = event.attendees.find(a => a.attendee.toString() === attendeeId.toString());
        if (!status) {
            return 'not-registered';
        }
        if (status.confirmed) {
            return 'confirmed';
        } else if (status.selected) {
            return 'selected';
        } else {
            return 'registered';
        }
    }

    // From the attendees of a specified event (null-checked), filters them and returns the result as a promise of
    // DataTableReturnInterface.
    async getFilteredAttendees(eventId: string, filter: DataTableInterface): Promise<DataTableReturnInterface> {
        const event: Events = await this.findOne({_id: eventId});
        if (!event) {
            throw new HttpException(`Event not found. (EventId: ${eventId})`, HttpStatus.NOT_FOUND);
        }

        let attendeeIds: string[] = event.attendees.map(attendee => attendee.attendee.toString());
        let res = await this.attendeeService.filterFrom(attendeeIds, filter);

        for (let attendee of res.data) {
            let a = event.attendees[
                event.attendees.findIndex( value => value.attendee.toString() === attendee._id.toString())
                ];

            if (a.confirmed) {
                attendee.status = "confirmed";
            } else if (a.declined) {
                attendee.status = "declined";
            } else if (a.selected) {
                attendee.status = "selected";
            } else {
                attendee.status = "registered";
            }
        }

        return res;
    }

    async selectAttendees(eventId, userIds: string[]) {
        let res: GetAllWithIdsResponse = await this.stsService.getAllWithIds(userIds);

        let emails = res.users.map(user => user.username);
        try {
            await this.emailService.sendEmail({
                from: "info@polyhx.io",
                to: emails,
                subject: "Hackatown 2018 - Selection",
                text: "Hackatown 2018 - Selection",
                html: "<h1>Congrats</h1>"
                //template: "hackatown2018-selection",
                //variables: {}
            });
        } catch (err) {
            console.log(err);
        }

        let attendees = await this.attendeeService.find({
            userId: {
                $in: userIds
            }
        });
        for (let attendee of attendees) {
            await this.eventsModel.update({
                "_id": eventId,
                "attendees.attendee": attendee._id
            }, {
                "attendees.$.selected": true
            }).exec();
        }

        return { };
    }
}
