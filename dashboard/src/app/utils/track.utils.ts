import { TrackTypes } from "../api/models/puzzle-hero";

export namespace TrackUtils {
    export function getTrackTypeIconClass(type: TrackTypes): string {
        switch (type) {
            case TrackTypes.Crypto:
                return "fal fa-key";
            case TrackTypes.Gaming:
                return "fal fa-gamepad";
            case TrackTypes.Scavenger:
                return "fal fa-camera-alt";
            case TrackTypes.Sponsor:
                return "fal fa-gem";
            case TrackTypes.Vine:
                return "fab fa-vine";
            case TrackTypes.EsotericLanguages:
                return "fal fa-book-spells";
            case TrackTypes.DataAnalysis:
                return "fal fa-analytics";
            case TrackTypes.Recon:
                return "fal fa-user-secret";
            case TrackTypes.Steganography:
                return "fal fa-search";
            case TrackTypes.Debugging:
                return "fal fa-debug";
            case TrackTypes.Forensics:
                return "fal fa-hdd";
            case TrackTypes.Charades:
                return "fal fa-comment";
            case TrackTypes.ReverseEngineering:
                return "fal fa-microscope";
            case TrackTypes.CodeGolf:
                return "fal fa-golf-ball";
            case TrackTypes.Regex:
                return "fal fa-slash";
            case TrackTypes.Scripting:
                return "fal fa-laptop-code";
            case TrackTypes.Food:
                return "fal fa-utensils";
            case TrackTypes.Karaoke:
                return "fal fa-music";
            case TrackTypes.Pwning:
                return "fal fa-skull";
            case TrackTypes.Authentication:
                return "fal fa-mobile";
        }
        return "";
    }
}
