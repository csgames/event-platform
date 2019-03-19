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
