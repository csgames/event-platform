export interface LoginDto {
    email: string;
    password: string;
    remember: boolean;
}

export interface ForgetDto {
    email: string;
}

export interface ResetDto {
    uuid: string;
    password: string;
}

export interface ValidateDto {
    uuid: string;
}