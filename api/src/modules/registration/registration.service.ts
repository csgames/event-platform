import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { STSService, UserModel } from '@polyhx/nest-services';

@Injectable()
export class RegistrationService {
    private roles;

    constructor(private readonly stsService: STSService) {
    }

    public async registerUser(userDto: Partial<UserModel>, role: string): Promise<string> {
        if (!this.roles) {
            await this.getRoles();
        }

        if (!this.roles[role]) {
            throw new HttpException("Invalid role", HttpStatus.BAD_REQUEST);
        }

        userDto.roleId = this.roles[role];

        try {
            const res = await this.stsService.registerUser(userDto);
            return res.userId;
        } catch (err) {
            throw new HttpException("Error while creating user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getRoles() {
        const roles = (await this.stsService.getRoles()).roles;

        this.roles = {};
        for (let role of roles) {
            this.roles[role.name] = role.id;
        }
    }
}
