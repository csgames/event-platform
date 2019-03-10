export interface Activity {
    _id?: string;
    type: string;
    name: string;
    beginDate: Date | string;
    endDate: Date | string;
    location: string;
    attendees: string[];
    subscribers: string[];
    details: any;
    subscribed?: boolean;
}
