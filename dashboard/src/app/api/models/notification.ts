import { Activity } from "./activity";

export interface AppNotification {
    _id?: string;
    title: string;
    body: string;
    type: string;
    activity: Activity;
    date: string;
    seen: boolean;
}
