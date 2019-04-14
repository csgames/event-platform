import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateSponsorDto, UpdateSponsorDto } from "./sponsors.dto";
import { Sponsors } from "./sponsors.model";
import { SponsorsService } from "./sponsors.service";

@ApiUseTags("Sponsor")
@Controller("sponsor")
@UseGuards(PermissionsGuard)
export class SponsorsController {
    constructor(private sponsorService: SponsorsService) {
    }

    @Post()
    @Permissions("csgames-api:create:sponsor")
    public async create(@Body(new ValidationPipe()) dto: CreateSponsorDto): Promise<Sponsors> {
        return await this.sponsorService.create(dto);
    }

    @Put(":id")
    @Permissions("csgames-api:create:sponsor")
    public async update(@Param("id") id: string, @Body(new ValidationPipe()) dto: UpdateSponsorDto): Promise<Sponsors> {
        return await this.sponsorService.update({
            _id: id
        }, dto);
    }

    @Get()
    @Permissions("csgames-api:get-all:sponsor")
    public async getAll(): Promise<Sponsors[]> {
        return await this.sponsorService.findAll();
    }
}
