export enum ActivityTypes {
    General = "other", 
    Meal = "food",
    Competition = "competition"
}

export interface Activity {
    _id?: string;
    type: string;
    name: any;
    beginDate: Date | string;
    endDate: Date | string;
    location: string;
    attendees: string[];
    subscribers: string[];
    hidden: boolean;
    details: any;
    subscribed?: boolean;
}

export interface CreateActivity {
    name: { [lang: string]: string };
    type: string;
    beginDate: Date | string;
    endDate: Date | string;
    beginTime: Date | string;
    endTime: Date | string;
    details: { [lang: string]: string };
    location: string;
    hidden: boolean;
}
