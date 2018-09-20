import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserModel } from "../sts/user.model";
import { STSService } from '@polyhx/nest-services';

@Injectable()
export class RegistrationService {
    private roles;

    private async getRoles() {
        let roles = (await this.stsService.getRoles()).roles;

        this.roles = {};
        for (let role of roles) {
            this.roles[role.name] = role.id;
        }
    }

    constructor(private readonly stsService: STSService) { }

    async registerUser(userDto: Partial<UserModel>, role: string) {
        if (!this.roles) {
            await this.getRoles();
        }

        if (!this.roles[role]) {
            throw new HttpException("Invalid role", HttpStatus.BAD_REQUEST);
        }

        userDto.roleId = this.roles[role];

        let user: string;
        try {
            user = (await this.stsService.registerUser(userDto)).userId;
        } catch (err) {
            throw new HttpException("Error while creating user", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return user;
    }
}
