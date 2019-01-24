export interface UserModel {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string[];
    isCaptain: Boolean;
}
