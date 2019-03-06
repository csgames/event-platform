export interface Activity {
    _id?: string;
    type: string;
    name: any;
    beginDate: Date | string;
    endDate: Date | string;
    location: string;
    attendees: string[];
    subscribers: string[];
    details: any;
}

export interface CreateActivity {
    name: { [lang: string]: string };
    type: string;
    beginDate: string;
    endDate: string;
    details: { [lang: string]: string };
    location: string;
}
