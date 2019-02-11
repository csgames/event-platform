export interface SponsorDetails {
    padding: number[];
    widthFactor: number;
    heightFactor: number;
}

export interface Sponsors {
    name: string;
    description: { [lang: string]: string };
    website: string;
    imageUrl: string;
    web: SponsorDetails;
    mobile: SponsorDetails;
}
