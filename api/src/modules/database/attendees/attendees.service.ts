import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Attendees } from './attendees.model';
import { BaseService } from '../../../services/base.service';
import { CreateAttendeeDto, UpdateAttendeeDto, UpdateNotificationDto } from './attendees.dto';
import { StorageService } from '@polyhx/nest-services';

@Injectable()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    constructor(@InjectModel("attendees") private readonly attendeesModel: Model<Attendees>,
                private storageService: StorageService) {
        super(attendeesModel);
    }

    public async addToken(userId: string, token: string): Promise<Attendees> {
        const attendee = await this.findOne({
            userId: userId
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (attendee.messagingTokens.indexOf(token) >= 0) {
            throw new BadRequestException('Token already exist');
        }

        return this.attendeesModel.updateOne({
            userId: userId
        }, {
            $push: {
                messagingTokens: token
            }
        });
    }

    public async removeToken(userId: string, token: string): Promise<Attendees> {
        const attendee = await this.findOne({
            userId: userId
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (attendee.messagingTokens.indexOf(token) < 0) {
            throw new BadRequestException("Token doesn't exist");
        }

        return this.attendeesModel.updateOne({
            userId: userId
        }, {
            $pull: {
                messagingTokens: token
            }
        });
    }

    public async updateNotification(userId: string, dto: UpdateNotificationDto): Promise<Attendees> {
        const attendee = await this.findOne({
            userId: userId
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (!attendee.notifications
            .find(x => (x.notification as mongoose.Types.ObjectId).toHexString() === dto.notification)) {
            throw new NotFoundException('Notification not found');
        }

        return this.attendeesModel.updateOne({
            userId: userId,
            "notifications.notification": dto.notification
        }, {
            "notifications.$.seen": dto.seen
        });
    }

    public async updateAttendeeInfo(conditionOrId: Object | string, dto: UpdateAttendeeDto, file: Express.Multer.File) {
        if (typeof conditionOrId === "string") {
            conditionOrId = {
                _id: conditionOrId
            };
        }
        const attendee = await this.findOne(conditionOrId);
        if (file) {
            if (attendee.cv) {
                await this.storageService.delete(attendee.cv);
            }
            dto.cv = await this.storageService.upload(file, 'cv');
        } else if (dto.cv === 'null') {
            if (attendee.cv) {
                await this.storageService.delete(attendee.cv);
            }
            dto.cv = null;
        } else {
            delete dto.cv;
        }

        await this.update(conditionOrId, {
            ...dto
        });
    }
}
