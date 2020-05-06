import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as uuid from "uuid";
import { BaseService } from "../../../services/base.service";
import { Auth0Service } from "../../auth0/auth0.service";
import { ConfigService } from "../../configs/config.service";
import { EmailService } from "../../email/email.service";
import { CreatePasswordResetDto, ResetPasswordDto } from "./password-resets.dto";
import { PasswordResets } from "./password-resets.model";

@Injectable()
export class PasswordResetsService extends BaseService<PasswordResets, CreatePasswordResetDto> {
    constructor(
        @InjectModel("password-resets") private readonly passwordResetsModel: Model<PasswordResets>,
        private configService: ConfigService,
        private emailService: EmailService,
        private auth0Service: Auth0Service
    ) {
        super(passwordResetsModel);
    }

    public async sendEmail(dto: CreatePasswordResetDto): Promise<void> {
        const user = await this.auth0Service.users.findUserByEmail(dto.email);
        if (!user) {
            return null;
        }

        let reset = await this.findOne({
            userId: user.user_id,
            used: false
        });
        if (!reset) {
            reset = await this.create({
                userId: user.user_id,
                uuid: uuid.v4(),
                used: false
            });
        } else {
            reset.uuid = uuid.v4();
            await reset.save();
        }

        await this.emailService.sendEmail({
            from: "CS Games <support@csgames.org>",
            to: [dto.email],
            subject: "Réinitialisation du Mot de Passe | Password Reset",
            text: "Reset password",
            template: "password_reset",
            variables: {
                url: `${this.configService.resetPasswordConfig.resetPasswordUrl}/${reset.uuid}`
            }
        });
    }

    public async validate(uuid: string): Promise<PasswordResets> {
        const reset = await this.findOne({
            uuid,
            used: {
                $ne: true
            }
        });
        if (!reset) {
            throw new BadRequestException();
        }
        return reset;
    }

    public async updatePassword(uuid: string, dto: ResetPasswordDto): Promise<void> {
        const reset = await this.validate(uuid);
        await this.auth0Service.users.updatePassword(reset.userId, dto.password);
        await super.update({
            uuid
        }, {
            used: true
        });
    }
}
