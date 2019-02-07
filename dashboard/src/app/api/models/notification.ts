import { Activity } from "./activity";

export interface Notification {
    _id?: string;
    title: string;
    body: string;
    type: string;
    activity: Activity;
    date: string;
    seen: boolean;
}