import { Injectable } from "@nestjs/common";
import { Auth0ManagementClient } from "../../management.client";
import { Permission, Role, User } from "auth0";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UsersService extends Auth0ManagementClient {
    public async createUser(dto: CreateUserDto): Promise<User> {
        return this.client.createUser({
            email: dto.email,
            password: dto.password,
            name: dto.email,
            connection: this.configService.auth0.defaultConnection
        });
    }

    public async deleteUser(id: string): Promise<void> {
        return this.client.deleteUser({
            id
        });
    }

    public async findUserByEmail(email: string): Promise<User> {
        return this.client.getUsersByEmail(email).then(x => x.shift());
    }

    public async updatePassword(userId: string, password: string): Promise<void> {
        await this.client.updateUser({
            id: userId
        }, {
            password: password
        });
    }
}
