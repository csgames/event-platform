import { QuestionTypes } from "../api/models/question";

export namespace QuestionUtils {
    export function getQuestionTypeIconClass(type: QuestionTypes): string {
        switch (type) {
            case QuestionTypes.Crypto:
                return "fal fa-key";
            case QuestionTypes.Gaming:
                return "fal fa-gamepad";
            case QuestionTypes.Scavenger:
                return "fal fa-camera-alt";
            case QuestionTypes.Sponsor:
                return "fal fa-gem";
            case QuestionTypes.Upload:
                return "fal fa-upload";
            case QuestionTypes.Vine:
                return "fab fa-vine";
            case QuestionTypes.EsotericLanguages:
                return "fal fa-book-spells";
            case QuestionTypes.DataAnalysis:
                return "fal fa-analytics";
            case QuestionTypes.Recon:
                return "fal fa-user-secret";
            case QuestionTypes.Steganography:
                return "fal fa-search";
            case QuestionTypes.Debugging:
                return "fal fa-debug";
            case QuestionTypes.Forensics:
                return "fal fa-hdd";
            case QuestionTypes.Charades:
                return "fal fa-comment";
            case QuestionTypes.ReverseEngineering:
                return "fal fa-microscope";
            case QuestionTypes.CodeGolf:
                return "fal fa-golf-ball";
            case QuestionTypes.Regex:
                return "fal fa-slash";
            case QuestionTypes.Scripting:
                return "fal fa-laptop-code";
            case QuestionTypes.Food:
                return "fal fa-utensils";
            case QuestionTypes.Karaoke:
                return "fal fa-music";
            case QuestionTypes.Pwning:
                return "fal fa-skull";
            case QuestionTypes.Authentication:
                return "fal fa-mobile";
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
                return "&#xf332;";
            case QuestionTypes.Sponsor:
                return "&#xf3a5;";
            case QuestionTypes.Upload:
                return "&#xf093;";
            case QuestionTypes.Vine:
                return "&#xf1ca;";
            case QuestionTypes.EsotericLanguages:
                return "&#xf6b8;";
            case QuestionTypes.DataAnalysis:
                return "&#xf643;";
            case QuestionTypes.Recon:
                return "&#xf21b;";
            case QuestionTypes.Steganography:
                return "&#xf002;";
            case QuestionTypes.Debugging:
                return "&#xf7f9;";
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
        }
        return "";
    }
}
