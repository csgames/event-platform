import { School } from "./school";

export interface Flashout {
    _id?: string;
    school: School;
    videoId: string;
    votes?: Vote[];
}

export interface Vote {
    rating: number;
}

export interface AttendeeVote {
    _id: string;
    rating: number;
}
