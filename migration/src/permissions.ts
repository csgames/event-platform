import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { Auth0Service } from "./auth0";

export interface Roles extends Document {
    Name: string;
    Permissions: string[];
}

export const RolesSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Permissions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Permission"
    }
});

export interface Permissions extends Document {
    Name: string;
}

export const PermissionsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    }
});



export class PermissionsServices {
    public permissionsRepository: Model<Permissions>;
    public rolesRepository: Model<Roles>;
    public auth0 = new Auth0Service();

    constructor() {
        mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.permissionsRepository = mongoose.model("Permission", PermissionsSchema, "Permission");
        this.rolesRepository = mongoose.model("Role", RolesSchema, "Role");
    }

    public async syncApiPermissions(): Promise<void> {
        const permissions = await this.permissionsRepository.find({
            Name: new RegExp(`csgames-api.*`, "i")
        }).lean().exec();
        await this.auth0.syncApiPermissions(permissions.map(x => x.Name));
    }

    public async syncRolePermissions(): Promise<void> {
        const permissions = await this.permissionsRepository.find({
            Name: new RegExp(`csgames-api.*`, "i")
        }).lean().exec();
        const roles = await this.rolesRepository.find().lean().exec();
        for (const role of roles) {
            const rolePermissions = permissions.filter(x => role.Permissions.some(p => x._id.equals(p)));
            await this.auth0.syncRoleApiPermissions(role.Name, rolePermissions.map(x => x.Name));
        }
    }
}
