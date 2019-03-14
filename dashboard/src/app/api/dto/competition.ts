export interface QuestionAnswerDto {
    answer?: string;
    file?: File;
    upload?: boolean;
}

export interface AuthCompetitionDto {
    password: string;
}

export interface SubscriptionDto {
    attendeeId: string;
    competitionId: string;
}
