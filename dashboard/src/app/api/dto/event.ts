export interface CreateEventDto {
    name: string;
    details: { [lang: string]: string };
    beginDate: Date;
    endDate: Date;
    imageUrl: string;
    coverUrl: string;
    flashoutBeginDate: Date;
    flashoutEndDate: Date;
    teamEditLockDate: Date;
    primaryColor: string;
}

export interface UpdateEventDto {
    name: string;
    details: { [lang: string]: string };
    beginDate: Date;
    endDate: Date;
    imageUrl: string;
    coverUrl: string;
    teamEditLockDate: Date;
    primaryColor: string;
}

export interface UpdateTemplateDto {
    html: string;
}
