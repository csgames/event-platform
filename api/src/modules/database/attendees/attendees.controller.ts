import {
    BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseFilters, UseGuards
} from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { StorageService } from "@polyhx/nest-services";
import { EventId } from "../../../decorators/event-id.decorator";
import { Permissions } from "../../../decorators/permission.decorator";
import { User } from "../../../decorators/user.decorator";
import { CodeExceptionFilter } from "../../../filters/code-error/code.filter";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { UserModel } from "../../../models/user.model";
import { NullPipe } from "../../../pipes/null-pipe.service";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { AddTokenDto, CreateAttendeeDto, UpdateAttendeeDto, UpdateNotificationDto } from "./attendees.dto";
import { codeMap } from "./attendees.exception";
import { CreateAttendeeGuard } from "./attendees.guard";
import { Attendees } from "./attendees.model";
import { AttendeeInfo, AttendeesService } from "./attendees.service";

@ApiUseTags("Attendee")
@Controller("attendee")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly storageService: StorageService) {
    }

    @Post()
    @UseGuards(CreateAttendeeGuard)
    public async create(@UploadedFile() file, @User() user: UserModel,
                        @Body(new ValidationPipe()) value: CreateAttendeeDto): Promise<{ attendee: Attendees }> {
        if (file) {
            value.cv = await this.storageService.upload(file);
        }
        let attendee: Partial<Attendees> = value;
        attendee = Object.assign(attendee, { userId: user.id });
        return {
            attendee: await this.attendeesService.create(attendee)
        };
    }

    @Get()
    @Permissions("csgames-api:get-all:attendee")
    public async getAll(): Promise<Attendees[]> {
        return await this.attendeesService.findAll();
    }

    @Get("info")
    public async getInfo(@User() user: UserModel, @EventId() event: string): Promise<AttendeeInfo> {
        return await this.attendeesService.getAttendeeInfo(user, event);
    }

    @Get("cv/url")
    @Permissions("csgames-api:get:attendee")
    public async getCvUrl(@User() user: UserModel): Promise<{ url: string }> {
        const attendee = await this.attendeesService.findOne({ email: user.username });
        if (attendee.cv) {
            return { url: await this.storageService.getDownloadUrl(attendee.cv) };
        } else {
            throw new BadRequestException("Attendee has no cv.");
        }
    }

    @Get(":id")
    @Permissions("csgames-api:get:attendee")
    public async getById(@Param("id") id: string): Promise<Attendees> {
        return await this.attendeesService.findOne({
            $or: [{
                publicId: id
            }, {
                userId: id
            }, {
                email: id
            }]
        });
    }

    @Get(":id/cv/url")
    @Permissions("csgames-api:get-all:attendee")
    public async getCvUrlById(@Param("id") id: string): Promise<{ url: string }> {
        const attendee = await this.attendeesService.findOne({ _id: id });
        if (attendee.cv) {
            return { url: await this.storageService.getDownloadUrl(attendee.cv) };
        } else {
            return { url: null };
        }
    }

    @Put()
    @Permissions("csgames-api:update:attendee")
    public async update(@UploadedFile() file, @User() user: UserModel,
                        @Body(NullPipe, new ValidationPipe()) value: UpdateAttendeeDto) {
        await this.attendeesService.updateAttendeeInfo({
            email: user.username
        }, value, file);
    }

    @Put("token")
    public async addToken(@User() user: UserModel, @Body(new ValidationPipe()) dto: AddTokenDto) {
        await this.attendeesService.addToken(user.username, dto.token);
    }

    @Put("notification")
    @Permissions("csgames-api:update:attendee")
    public async updateNotification(@User() user: UserModel, @Body(new ValidationPipe()) dto: UpdateNotificationDto) {
        await this.attendeesService.updateNotification(user.username, dto);
    }

    @Put(":attendee_id/public-id/:public_id")
    @Permissions("csgames-api:set-public-id:attendee")
    async setPublicId(@Param("attendee_id") attendeeId: string, @Param("public_id") publicId: string) {
        let attendee: Attendees = await this.attendeesService.findById(attendeeId);

        if (!attendee) {
            throw new NotFoundException(`Attendee ${attendeeId} not found.`);
        }

        attendee.publicId = publicId;

        await attendee.save();

        return attendee;
    }

    @Delete("/token/:token")
    public async deleteToken(@User() user: UserModel, @Param("token") token) {
        await this.attendeesService.removeToken(user.username, token);
    }
}
