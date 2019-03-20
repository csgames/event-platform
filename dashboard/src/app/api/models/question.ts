export enum QuestionTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavenger = "scavenger",
    Sponsor = "sponsor",
    Upload = "upload",
    Vine = "vine",
    EsotericLanguages = "esoteric_languages",
    DataAnalysis = "data_analysis",
    Recon = "recon",
    Steganography = "steganography",
    Debugging = "debugging",
    Forensics = "forensics",
    Charades = "charades",
    ReverseEngineering = "reverse_engineering",
    CodeGolf = "code_golf",
    Regex = "regex",
    Scripting = "scripting",
    Food = "food",
    Karaoke = "karaoke",
    Pwning = "pwning",
    Authentication = "authentication"
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
