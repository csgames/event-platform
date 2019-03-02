import { BaseService } from "../../../services/base.service";
import { FlashOut } from "./flash-out.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { UserNotAttendeeException } from "../events/events.exception";
import { AttendeesService } from "../attendees/attendees.service";

@Injectable()
export class FlashOutsService extends BaseService<FlashOut, FlashOut> {
    constructor(@InjectModel("flash-outs") private readonly flashOutsModel: Model<FlashOut>,
                private readonly attendeeService: AttendeesService) {
        super(flashOutsModel);
    }

    public async getByEvent(eventId: string, email: string): Promise<FlashOut[]> {
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