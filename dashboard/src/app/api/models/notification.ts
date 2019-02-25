export interface AttendeeNotification {
    _id?: string;
    notification: AppNotification;
    seen: boolean;
}

export interface AppNotification {
    _id: string;
    title: string;
    body: string;
    data: object;
    timestamp: string;
}
