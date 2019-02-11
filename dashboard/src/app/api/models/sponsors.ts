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
<<<<<<< HEAD
    padding: string[];
    widthFactor: number;
    heightFactor: number;
=======
    web: SponsorDetails;
    mobile: SponsorDetails;
>>>>>>> e5c8e356f976ab96684da4f3cbb3fed07a966e74
}
