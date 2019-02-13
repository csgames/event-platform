import { EventGuide } from './guide';

export interface Event {
    _id: string;
    name: string;
    details?: any;
    beginDate: Date | string;
    endDate: Date | string;
    activities?: any[];
    imageUrl: string;
    coverUrl?: string;
    website?: string;
    facebookEvent?: string;
    locationName?: string;
    locationAddress?: string;
    maxTeamMembers?: number;
    guide: EventGuide;
}
