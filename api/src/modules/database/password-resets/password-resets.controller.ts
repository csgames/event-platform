import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { PublicRoute } from "nestjs-jwt2";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreatePasswordResetDto, ResetPasswordDto } from "./password-resets.dto";
import { PasswordResetsService } from "./password-resets.service";

@Controller("password-reset")
export class PasswordResetsController {
    constructor(private readonly passwordResetsService: PasswordResetsService) {
    }

    @Post()
    @PublicRoute()
    public create(@Body(new ValidationPipe()) dto: CreatePasswordResetDto): void {
        this.passwordResetsService.sendEmail(dto);
    }

    @Get(":uuid")
    @PublicRoute()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async validate(@Param("uuid") uuid: string): Promise<void> {
        await this.passwordResetsService.validate(uuid);
    }

    @Put(":uuid")
    @PublicRoute()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async resetPassword(@Param("uuid") uuid: string, @Body(new ValidationPipe()) dto: ResetPasswordDto): Promise<void> {
        return await this.passwordResetsService.updatePassword(uuid, dto);
    }
}
