import { Sponsors } from "../../../api/models/sponsors";

export interface SponsorTier {
    name: string;
    sponsors: Sponsors[];
    maxInLine: number;
    size: number;
    gap: number;
}
