export enum QuestionTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavenger = "scavenger",
    Sponsor = "sponsor",
    Upload = "upload"
}

export enum ValidationTypes {
    String = "string",
    Regex = "regex",
    Function = "function",
    None = "none"
}

export enum InputTypes {
    String = "string",
    Upload = "upload",
    Code = "code"
}

export interface Question {
    _id: string;
    label: string;
    description: { [lang: string]: string };
    type: QuestionTypes;
    inputType: InputTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
    isAnswered?: boolean;
    isLocked?: boolean;
}

export interface QuestionGraphNode {
    _id?: string;
    question: Question;
    dependsOn?: Question | string;
}
