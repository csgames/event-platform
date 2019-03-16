import { QuestionGraphNode } from "../models/question";

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

export interface UpdateCompetitionDto {
    activities?: string[];
    questions?: QuestionGraphNode[];
    description?: { [lang: string]: string };
    maxMembers?: number;
    password?: string;
    isLive?: boolean;
    onDashboard?: boolean;
}
