import { EventGuide } from "./guide";
import { TeamResult } from "./competition";

export interface Event {
    _id?: string;
    name: string;
    details: any;
    beginDate: Date | string;
    endDate: Date | string;
    flashoutBeginDate?: string | Date;
    flashoutEndDate?: string | Date;
    activities?: any[];
    imageUrl: string;
    coverUrl: string;
    website: string;
    locationName: string;
    locationAddress: string;
    maxTeamMembers?: number;
    guide?: EventGuide;
    teamEditLocked?: boolean;
    teamEditLockDate?: Date | string;
    primaryColor: string;
    competitionResultsLocked?: boolean;
}

export interface EventScore {
    overall: TeamResult[];
    competitions: { _id: string, name: any, results: TeamResult[] }[];
}
