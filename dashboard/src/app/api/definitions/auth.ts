export interface Login {
    success?: boolean;
    error?: string;
}

export interface IsLoggedIn {
    logged_in: boolean;
}

export interface Forget {
    success?: boolean;
    error?: string;
}
