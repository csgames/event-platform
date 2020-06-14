import { QuestionTypes } from "../api/models/question";

export namespace QuestionUtils {
    export function getQuestionTypeIconClass(type: QuestionTypes): string {
        switch (type) {
            case QuestionTypes.Crypto:
                return "fa fa-key";
            case QuestionTypes.Gaming:
                return "fa fa-gamepad";
            case QuestionTypes.Scavenger:
                return "fa fa-camera";
            case QuestionTypes.Sponsor:
                return "fa fa-gem";
            case QuestionTypes.Upload:
                return "fa fa-upload";
            case QuestionTypes.Vine:
                return "fab fa-vine";
            case QuestionTypes.EsotericLanguages:
                return "fa fa-atlas";
            case QuestionTypes.DataAnalysis:
                return "fa fa-chart-bar";
            case QuestionTypes.Recon:
                return "fa fa-user-secret";
            case QuestionTypes.Steganography:
                return "fa fa-search";
            case QuestionTypes.Debugging:
                return "fa fa-bug";
            case QuestionTypes.Forensics:
                return "fa fa-hdd";
            case QuestionTypes.Charades:
                return "fa fa-comment";
            case QuestionTypes.ReverseEngineering:
                return "fa fa-microscope";
            case QuestionTypes.CodeGolf:
                return "fa fa-golf-ball";
            case QuestionTypes.Regex:
                return "fa fa-slash";
            case QuestionTypes.Scripting:
                return "fa fa-laptop-code";
            case QuestionTypes.Food:
                return "fa fa-utensils";
            case QuestionTypes.Karaoke:
                return "fa fa-music";
            case QuestionTypes.Pwning:
                return "fa fa-skull";
            case QuestionTypes.Authentication:
                return "fa fa-mobile";
            case QuestionTypes.StaticAnalysis:
                return "fa fa-file-code";
            case QuestionTypes.ArtificialIntelligence:
                return "fa fa-robot";
            case QuestionTypes.OffensiveSecurity:
                return "fa fa-khanda";
            case QuestionTypes.DefensiveSecurity:
                return "fa fa-shield-alt";
        }
        return "";
    }

    export function getQuestionTypeIconCharacter(type: QuestionTypes): string {
        switch (type) {
            case QuestionTypes.Crypto:
                return "&#xf084;";
            case QuestionTypes.Gaming:
                return "&#xf11b;";
            case QuestionTypes.Scavenger:
                return "&#xf030;";
            case QuestionTypes.Sponsor:
                return "&#xf3a5;";
            case QuestionTypes.Upload:
                return "&#xf093;";
            case QuestionTypes.Vine:
                return "&#xf1ca;";
            case QuestionTypes.EsotericLanguages:
                return "&#xf558;";
            case QuestionTypes.DataAnalysis:
                return "&#xf080;";
            case QuestionTypes.Recon:
                return "&#xf21b;";
            case QuestionTypes.Steganography:
                return "&#xf002;";
            case QuestionTypes.Debugging:
                return "&#xf188;";
            case QuestionTypes.Forensics:
                return "&#xf0a0;";
            case QuestionTypes.Charades:
                return "&#xf075;";
            case QuestionTypes.ReverseEngineering:
                return "&#xf610;";
            case QuestionTypes.CodeGolf:
                return "&#xf450;";
            case QuestionTypes.Regex:
                return "&#xf715;";
            case QuestionTypes.Scripting:
                return "&#xf5fc;";
            case QuestionTypes.Food:
                return "&#xf2e7;";
            case QuestionTypes.Karaoke:
                return "&#xf001;";
            case QuestionTypes.Pwning:
                return "&#xf54c";
            case QuestionTypes.Authentication:
                return "&#xf10b";
            case QuestionTypes.StaticAnalysis:
                return "&#xf1c9";
            case QuestionTypes.ArtificialIntelligence:
                return "&#xf544";
            case QuestionTypes.OffensiveSecurity:
                return "&#xf71d";
            case QuestionTypes.DefensiveSecurity:
                return "&#xf3ed";
        }
        return "";
    }
}
