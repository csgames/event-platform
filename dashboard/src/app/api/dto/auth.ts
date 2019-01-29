export interface LoginDto {
    email: string;
    password: string;
    remember: boolean;
}

export interface ForgetDto {
    email: string;
}