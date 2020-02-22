import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { PublicRoute } from "nestjs-jwt2";
import { EventId } from "../../../decorators/event-id.decorator";
import { Permissions } from "../../../decorators/permission.decorator";
import { Role } from "../../../decorators/role.decorator";
import { CodeExceptionFilter } from "../../../filters/code-error/code.filter";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { codeMap } from "./registration.exception";
import { CreateRegistrationDto, RegisterAttendeeDto, RegisterRoleDto } from "./registrations.dto";
import { CreateRegistrationGuard } from "./registrations.guard";
import { Registrations } from "./registrations.model";
import { RegistrationsService } from "./registrations.service";

@Controller("registration")
@UseFilters(new CodeExceptionFilter(codeMap))
@UseGuards(PermissionsGuard)
export class RegistrationsController {
    constructor(private readonly registrationService: RegistrationsService) {
    }

    @Post()
    @UseGuards(CreateRegistrationGuard)
    @Permissions("csgames-api:create:invitation")
    public async createInvitation(@Body(new ValidationPipe()) dto: CreateRegistrationDto,
                                  @Role() role: string,
                                  @EventId() eventId: string
    ): Promise<void> {
        return await this.registrationService.create(dto, role, eventId);
    }

    @Post("attendee")
    @PublicRoute()
    public async registerAttendee(@Body(new ValidationPipe()) user: RegisterAttendeeDto) {
        await this.registrationService.registerAttendee(user);
    }

    @Post("role")
    @Permissions("csgames-api:create-admin:invitation")
    public async registerAdmin(@Body(new ValidationPipe()) user: RegisterRoleDto, @EventId() eventId: string) {
        await this.registrationService.registerRole(user, eventId);
    }

    @Get(":uuid")
    @PublicRoute()
    public async getRegistrationInfo(@Param("uuid") uuid: string): Promise<Registrations> {
        return await this.registrationService.getRegistrationInfo(uuid);
    }
}
