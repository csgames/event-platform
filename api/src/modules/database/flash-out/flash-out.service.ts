import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { UserNotAttendeeException } from "../events/events.exception";
import { Events, EventsUtils } from "../events/events.model";
import { FlashOut } from "./flash-out.model";

@Injectable()
export class FlashOutsService extends BaseService<FlashOut, FlashOut> {
    constructor(@InjectModel("flash-outs") private readonly flashOutsModel: Model<FlashOut>,
                @InjectModel("events") private readonly eventModel: Model<Events>,
                private readonly attendeeService: AttendeesService) {
        super(flashOutsModel);
    }

    public async getByEvent(eventId: string, email: string, role: string): Promise<FlashOut[]> {
        const attendee = await this.attendeeService.findOne({
            email
        });

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        const flashOuts = await this.flashOutsModel.find({
            event: eventId
        }).populate({
            path: "school"
        }).exec();

        if (role.endsWith("admin")) {
            flashOuts.forEach((f) => {
                const total = f.votes.reduce((a, v) => a + v.rating, 0);
                f.averageRating = total / f.votes.length;
            });

            return flashOuts;
        }

        const event = await this.eventModel.findById(eventId);
        if (!EventsUtils.isFlashoutAvailable(event)) {
            return;
        }

        flashOuts.forEach((f) => {
            f.votes = f.votes.filter((v) => (v.attendee as Types.ObjectId).equals(attendee.id));
        });

        return flashOuts;
    }

    public async addRating(eventId: string, attendee: string, flashOutId: string, rating: number) {
        const flashOuts = await this.flashOutsModel.findOne({
            event: eventId,
            _id: flashOutId
        }).exec();

        if (!flashOuts) {
            return;
        }

        const vote = flashOuts.votes.find((v) => (v.attendee as Types.ObjectId).equals(attendee));
        if (vote) {
            return;
        }

        await flashOuts.update({
            $push: {
                votes: {
                    attendee,
                    rating
                }
            }
        }).exec();
    }
}
