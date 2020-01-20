export interface SponsorDetails {
    padding: number[];
    widthFactor: number;
    heightFactor: number;
}

export interface Sponsors {
    _id?: string;
    name: string;
    description: { [lang: string]: string };
    website: string;
    imageUrl: string;
    web: SponsorDetails;
    mobile: SponsorDetails;
}
